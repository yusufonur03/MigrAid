// Gemini API service for handling prompts and responses
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

// Load API key from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize the Gemini client
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Default model to use
const defaultModel = "gemini-2.0-flash";

// System prompts for different functionalities
const systemPrompts = {
  chat: "You are an AI assistant helping migrants adapt to life in Türkiye. Please provide clear and helpful responses in a conversational manner. If the user communicates in Turkish, respond in Turkish. If the user communicates in another language, respond in that language if possible, or in English otherwise.",

  formFill:
    "You are an AI assistant helping migrants fill out official forms in Türkiye. Guide the user step-by-step through the form filling process, explaining what each field requires and how to complete it correctly. Always be precise about required document formats and information.",

  culturalInfo:
    "You are an AI assistant specializing in Turkish culture, traditions, idioms (deyimler), and proverbs (atasözleri). Provide accurate information about Turkish cultural aspects, and when appropriate, explain idioms and proverbs with their meanings and usage examples.",

  integrationRoadmap:
    "You are an AI assistant helping migrants develop a personalized integration roadmap in Türkiye. Based on the user's background, skills, goals, and current progress, suggest logical next steps and resources for integration. You can also evaluate their integration progress based on language proficiency, cultural understanding, professional development, and social connections.",

  skillMatch:
    "You are an AI assistant helping migrants match their skills and experience with suitable job opportunities in Türkiye. Analyze the user's qualifications, suggest potential career paths, recommend skill development if needed, and provide information about the Turkish job market in relevant sectors.",
};

/**
 * Sends a prompt to the Gemini API with a specific system prompt
 * @param {string} prompt - The user's message/prompt
 * @param {string} systemPromptType - Type of system prompt to use (chat, formFill, culturalInfo, etc.)
 * @param {object} options - Additional options (language, etc.)
 * @returns {Promise<object>} Response from Gemini API
 */
async function sendPrompt(prompt, systemPromptType = "chat", options = {}) {
  try {
    // Select the appropriate system prompt
    const systemPrompt = systemPrompts[systemPromptType] || systemPrompts.chat;

    // Get model instance
    const model = genAI.models.getGenerativeModel({ model: defaultModel });

    // Prepare the generation config
    const generationConfig = {
      temperature: options.temperature || 0.7,
      topK: options.topK || 40,
      topP: options.topP || 0.95,
      maxOutputTokens: options.maxOutputTokens || 1024,
      systemInstruction: { text: systemPrompt },
    };

    // Send the prompt to Gemini API
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    // Return the response text and any additional data
    const response = result.response;
    return {
      text: response.text(),
      candidates: response.candidates,
      promptFeedback: response.promptFeedback,
    };
  } catch (error) {
    console.error("Error in Gemini API:", error);
    throw new Error(`Gemini API error: ${error.message}`);
  }
}

/**
 * Sends a prompt to the Gemini API with streaming response
 * @param {string} prompt - The user's message/prompt
 * @param {string} systemPromptType - Type of system prompt to use
 * @param {object} options - Additional options
 * @returns {AsyncGenerator} Stream of responses
 */
async function* streamPrompt(prompt, systemPromptType = "chat", options = {}) {
  try {
    // Select the appropriate system prompt
    const systemPrompt = systemPrompts[systemPromptType] || systemPrompts.chat;

    // Get model instance
    const model = genAI.models.getGenerativeModel({ model: defaultModel });

    // Prepare the generation config
    const generationConfig = {
      temperature: options.temperature || 0.7,
      topK: options.topK || 40,
      topP: options.topP || 0.95,
      maxOutputTokens: options.maxOutputTokens || 1024,
      systemInstruction: { text: systemPrompt },
    };

    // Send the prompt to Gemini API with streaming
    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    // Yield each chunk as it comes in
    for await (const chunk of result.stream) {
      yield chunk.text();
    }
  } catch (error) {
    console.error("Error in Gemini API streaming:", error);
    throw new Error(`Gemini API streaming error: ${error.message}`);
  }
}

module.exports = {
  sendPrompt,
  streamPrompt,
  systemPrompts,
};
