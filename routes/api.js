const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const { sendPrompt, streamPrompt } = require("../services/geminiService");

// Simple API info route - no authentication
router.get("/", (req, res) => {
  res.json({
    message: "MigAid API is running",
    endpoints: [
      "/api/auth/signup",
      "/api/auth/verify-token",
      "/api/chat",
      "/api/form-fill",
      "/api/cultural-info",
      "/api/integration-roadmap",
      "/api/skill-match",
      "/api/chat/stream",
    ],
  });
});

// POST /api/chat - Generic chat endpoint
router.post("/chat", authenticate, async (req, res) => {
  try {
    const { prompt, language } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const options = {
      temperature: 0.7,
      language: language || "en",
    };

    const response = await sendPrompt(prompt, "chat", options);

    return res.status(200).json({
      success: true,
      response: response.text,
    });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    return res.status(500).json({
      error: error.message || "An error occurred during chat processing",
    });
  }
});

// POST /api/form-fill - Form filling guidance
router.post("/form-fill", authenticate, async (req, res) => {
  try {
    const { prompt, formType, language } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Enhanced prompt with form type if provided
    const enhancedPrompt = formType ? `Form type: ${formType}. Question/Request: ${prompt}` : prompt;

    const options = {
      temperature: 0.2, // Lower temperature for more precise form guidance
      language: language || "en",
    };

    const response = await sendPrompt(enhancedPrompt, "formFill", options);

    return res.status(200).json({
      success: true,
      response: response.text,
    });
  } catch (error) {
    console.error("Error in form-fill endpoint:", error);
    return res.status(500).json({
      error: error.message || "An error occurred during form guidance",
    });
  }
});

// POST /api/cultural-info - Cultural information and explanations
router.post("/cultural-info", authenticate, async (req, res) => {
  try {
    const { prompt, language } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const options = {
      temperature: 0.5,
      language: language || "en",
    };

    const response = await sendPrompt(prompt, "culturalInfo", options);

    return res.status(200).json({
      success: true,
      response: response.text,
    });
  } catch (error) {
    console.error("Error in cultural-info endpoint:", error);
    return res.status(500).json({
      error: error.message || "An error occurred while retrieving cultural information",
    });
  }
});

// POST /api/integration-roadmap - Personalized integration roadmap
router.post("/integration-roadmap", authenticate, async (req, res) => {
  try {
    const { prompt, background, goals, language } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Enhanced prompt with user background and goals if provided
    let enhancedPrompt = prompt;
    if (background) {
      enhancedPrompt = `User Background: ${background}. ${enhancedPrompt}`;
    }
    if (goals) {
      enhancedPrompt = `${enhancedPrompt} User Goals: ${goals}.`;
    }

    const options = {
      temperature: 0.6,
      maxOutputTokens: 1500, // Allow longer responses for detailed roadmaps
      language: language || "en",
    };

    const response = await sendPrompt(enhancedPrompt, "integrationRoadmap", options);

    return res.status(200).json({
      success: true,
      response: response.text,
    });
  } catch (error) {
    console.error("Error in integration-roadmap endpoint:", error);
    return res.status(500).json({
      error: error.message || "An error occurred while creating the integration roadmap",
    });
  }
});

// POST /api/skill-match - Match skills with job opportunities
router.post("/skill-match", authenticate, async (req, res) => {
  try {
    const { prompt, skills, experience, language } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Enhanced prompt with user skills and experience if provided
    let enhancedPrompt = prompt;
    if (skills) {
      enhancedPrompt = `User Skills: ${skills}. ${enhancedPrompt}`;
    }
    if (experience) {
      enhancedPrompt = `${enhancedPrompt} User Experience: ${experience}.`;
    }

    const options = {
      temperature: 0.4,
      maxOutputTokens: 1200,
      language: language || "en",
    };

    const response = await sendPrompt(enhancedPrompt, "skillMatch", options);

    return res.status(200).json({
      success: true,
      response: response.text,
    });
  } catch (error) {
    console.error("Error in skill-match endpoint:", error);
    return res.status(500).json({
      error: error.message || "An error occurred while matching skills to jobs",
    });
  }
});

// POST /api/chat/stream - Streaming chat endpoint
router.post("/chat/stream", authenticate, async (req, res) => {
  try {
    const { prompt, language } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Set headers for SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const options = {
      temperature: 0.7,
      language: language || "en",
    };

    // Use the streaming function
    const stream = streamPrompt(prompt, "chat", options);

    // Stream each chunk to the client
    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
    }

    // End the stream
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Error in streaming chat endpoint:", error);

    // If headers haven't been sent yet, send error as JSON
    if (!res.headersSent) {
      return res.status(500).json({
        error: error.message || "An error occurred during streaming chat",
      });
    }

    // Otherwise, send error as SSE
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

module.exports = router;
