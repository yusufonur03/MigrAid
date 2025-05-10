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
const systemPrompts = require("../config/systemPrompts.json");

/**
 * Sends a prompt to the Gemini API with a specific system prompt
 * @param {string} prompt - The user's message/prompt
 * @param {string} systemPromptType - Type of system prompt to use (chat, formFill, culturalInfo, etc.)
 * @param {object} options - Additional options (language, etc.)
 * @param {Array<object>} history - Optional chat history
 * @returns {Promise<object>} Response from Gemini API
 */
async function sendPrompt(prompt, systemPromptType = "chat", options = {}, history = []) {
  console.log(`sendPrompt called with prompt: "${prompt}", type: "${systemPromptType}"`);
  try {
    // Select the appropriate system prompt
    const systemPrompt = systemPrompts[systemPromptType] || systemPrompts.chat;

    // Prepare the generation config
    const generationConfig = {
      temperature: options.temperature || 0.7,
      topK: options.topK || 40,
      topP: options.topP || 0.95,
      maxOutputTokens: options.maxOutputTokens || 1024,
      systemInstruction: { text: systemPrompt },
    };

    // Prepare the contents with history and the current prompt
    const contents = [...history, { role: "user", parts: [{ text: prompt }] }];

    // Send the prompt to Gemini API
    const result = await genAI.models.generateContent({
      model: defaultModel, // Specify the model here
      contents: contents,
      generationConfig,
    });

    // Return the response text and any additional data
    return {
      text: result.text, // Access text directly from result
      candidates: result.candidates,
      promptFeedback: result.promptFeedback,
    };
  } catch (error) {
    console.error("Error in Gemini API sendPrompt:", error);
    throw new Error(`Gemini API error: ${error.message}`);
  }
}

/**
 * Sends a prompt to the Gemini API with streaming response
 * @param {string} prompt - The user's message/prompt
 * @param {string} systemPromptType - Type of system prompt to use
 * @param {object} options - Additional options
 * @param {Array<object>} history - Optional chat history
 * @returns {AsyncGenerator} Stream of responses
 */
async function* streamPrompt(prompt, systemPromptType = "chat", options = {}, history = []) {
  try {
    // Select the appropriate system prompt
    const systemPrompt = systemPrompts[systemPromptType] || systemPrompts.chat;

    // Prepare the generation config
    const generationConfig = {
      temperature: options.temperature || 0.7,
      topK: options.topK || 40,
      topP: options.topP || 0.95,
      maxOutputTokens: options.maxOutputTokens || 1024,
      systemInstruction: { text: systemPrompt },
    };

    // Prepare the contents with history and the current prompt
    const contents = [...history, { role: "user", parts: [{ text: prompt }] }];

    // Send the prompt to Gemini API with streaming
    const result = await genAI.models.generateContentStream({
      model: defaultModel,
      contents: contents,
      generationConfig,
    });

    // Check if stream exists before attempting to iterate over it
    if (!result.stream && !result[Symbol.asyncIterator]) {
      throw new Error(
        "Gemini API response doesn't support streaming. Check API key, model, input, or potential content safety flags."
      );
    }

    // Determine how to iterate through the stream based on the API response structure
    const stream = result.stream || result;

    // Yield each chunk as it comes in
    for await (const chunk of stream) {
      if (chunk.text) {
        yield chunk.text;
      } else if (typeof chunk === "string") {
        yield chunk;
      } else if (chunk.candidates && chunk.candidates[0]?.content?.parts[0]?.text) {
        yield chunk.candidates[0].content.parts[0].text;
      }
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
