const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

// Load API key from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize the Gemini client
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Default model to use
const MODEL_NAME = "gemini-2.0-flash";

// System prompts for different functionalities
const systemPrompts = require("../config/systemPrompts.json");

// In-memory storage for form sessions
const formSessions = new Map();

/**
 * Process a PDF file and initialize a form filling session
 * @param {Object} fileData - Object containing file information
 * @param {string} fileData.path - Path to the uploaded file
 * @param {string} fileData.originalname - Original name of the file
 * @param {string} userId - User ID for tracking session ownership
 * @returns {Promise<Object>} Session details
 */
async function processPdfFile(fileData, userId) {
  try {
    // Generate a unique session ID
    const sessionId = uuidv4();

    // Read the file as binary data
    const fileBuffer = fs.readFileSync(fileData.path);

    // Convert the buffer to base64
    const base64File = fileBuffer.toString("base64");

    // Get the model instance - using correct initialization syntax
    const model = genAI.models.generateContent;

    // Store file reference to clean up later
    const filePath = fileData.path;

    // Get file analysis from Gemini
    const initialPrompt =
      "Bu PDF formu analiz edip hangi bilgileri doldurmanız gerektiğini belirtin. " +
      "Formun adı ve amacı nedir? İçindeki alanları sırasıyla belirtin. " +
      "Kullanıcıdan gerekli bilgileri almak için forma uygun sorular sorun.";

    const systemPrompt = systemPrompts.formFill;

    const result = await model({
      model: MODEL_NAME,
      contents: [
        {
          role: "user",
          parts: [
            { text: initialPrompt },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: base64File,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 1024,
        systemInstruction: { text: systemPrompt },
      },
    });

    // Extract text from response properly, handling different response structures
    let initialMessage = "";
    if (result && result.response) {
      initialMessage = result.response.text();
    } else if (result && result.candidates && result.candidates.length > 0) {
      const candidate = result.candidates[0];
      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        initialMessage = candidate.content.parts[0].text || "";
      }
    } else if (result && result.text) {
      initialMessage = result.text;
    } else {
      console.log("Response structure:", JSON.stringify(result, null, 2));
      initialMessage =
        "PDF form processed, but couldn't extract information. Please ask specific questions about the form.";
    }

    // Store session info
    formSessions.set(sessionId, {
      userId,
      filePath,
      lastActivity: Date.now(),
      conversation: [{ role: "assistant", content: initialMessage }],
    });

    // Auto-cleanup after 1 hour of inactivity
    setTimeout(() => {
      cleanupSession(sessionId);
    }, 3600000);

    return {
      sessionId,
      initialMessage,
    };
  } catch (error) {
    console.error("Error processing PDF file:", error);

    // Clean up the uploaded file
    if (fileData.path && fs.existsSync(fileData.path)) {
      fs.unlinkSync(fileData.path);
    }

    throw new Error(`Failed to process PDF: ${error.message}`);
  }
}

/**
 * Add a message to an existing form filling session
 * @param {string} sessionId - The ID of the session
 * @param {string} message - User's message
 * @param {string} userId - User ID for authorization
 * @returns {Promise<Object>} Response from Gemini
 */
async function sendMessage(sessionId, message, userId) {
  if (!formSessions.has(sessionId)) {
    throw new Error("Session not found or expired");
  }

  const session = formSessions.get(sessionId);

  // Validate user ownership
  if (session.userId !== userId) {
    throw new Error("Unauthorized access to session");
  }

  try {
    // Update last activity
    session.lastActivity = Date.now();

    // Add message to conversation history
    session.conversation.push({ role: "user", content: message });

    // Prepare conversation for Gemini
    const conversationHistory = session.conversation.map((msg) => {
      return {
        role: msg.role,
        parts: [{ text: msg.content }],
      };
    });

    // Append context about the PDF form if needed
    const systemPrompt = systemPrompts.formFill;

    // Initialize the Gemini model - using correct initialization syntax
    const model = genAI.models.generateContent;

    // Generate response from Gemini
    const result = await model({
      model: MODEL_NAME,
      contents: conversationHistory,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1024,
        systemInstruction: { text: systemPrompt },
      },
    });

    // Extract text from response properly, handling different response structures
    let responseText = "";
    if (result && result.response) {
      responseText = result.response.text();
    } else if (result && result.candidates && result.candidates.length > 0) {
      const candidate = result.candidates[0];
      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        responseText = candidate.content.parts[0].text || "";
      }
    } else if (result && result.text) {
      responseText = result.text;
    } else {
      console.log("Response structure:", JSON.stringify(result, null, 2));
      responseText = "I couldn't process your request. Could you please rephrase your question?";
    }

    // Add AI response to conversation history
    session.conversation.push({ role: "assistant", content: responseText });

    // Update session with new conversation
    formSessions.set(sessionId, session);

    return {
      response: responseText,
    };
  } catch (error) {
    console.error(`Error in session ${sessionId}:`, error);
    throw new Error(`Failed to generate response: ${error.message}`);
  }
}

/**
 * Clean up a session and its resources
 * @param {string} sessionId - The ID of the session to clean up
 */
function cleanupSession(sessionId) {
  if (!formSessions.has(sessionId)) {
    return;
  }

  const session = formSessions.get(sessionId);

  // Delete the temporary file if it exists
  if (session.filePath && fs.existsSync(session.filePath)) {
    fs.unlinkSync(session.filePath);
  }

  // TODO: Delete the file from Gemini API if needed
  // This would require implementing the delete operation

  // Remove session data
  formSessions.delete(sessionId);
}

/**
 * Get session information
 * @param {string} sessionId - The ID of the session
 * @param {string} userId - User ID for authorization
 * @returns {Object} Session information
 */
function getSession(sessionId, userId) {
  if (!formSessions.has(sessionId)) {
    throw new Error("Session not found or expired");
  }

  const session = formSessions.get(sessionId);

  // Validate user ownership
  if (session.userId !== userId) {
    throw new Error("Unauthorized access to session");
  }

  return {
    sessionId,
    lastActivity: session.lastActivity,
    messageCount: session.conversation.length,
  };
}

module.exports = {
  processPdfFile,
  sendMessage,
  getSession,
  cleanupSession,
};
