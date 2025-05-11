const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { authenticate } = require("../middleware/auth");
const { processPdfFile, sendMessage, getSession } = require("../services/fileService");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads");
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp and original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `form-${uniqueSuffix}${ext}`);
  },
});

// File filter to only accept PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// Initialize upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

// POST /api/form-fill/upload - Upload PDF form
router.post("/upload", authenticate, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded or file is not a PDF",
      });
    }

    // Get user ID from authenticated request
    const userId = req.user.uid;

    // Process the uploaded PDF
    const result = await processPdfFile(req.file, userId);

    return res.status(200).json({
      success: true,
      sessionId: result.sessionId,
      initialMessage: result.initialMessage,
    });
  } catch (error) {
    console.error("Error in form upload endpoint:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Error processing PDF form",
    });
  }
});

// POST /api/form-fill/message - Send message in form session
router.post("/message", authenticate, async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
      return res.status(400).json({
        success: false,
        error: "Session ID and message are required",
      });
    }

    // Get user ID from authenticated request
    const userId = req.user.uid;

    // Process the message
    const result = await sendMessage(sessionId, message, userId);

    return res.status(200).json({
      success: true,
      response: result.response,
    });
  } catch (error) {
    console.error("Error in form message endpoint:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Error processing message",
    });
  }
});

// GET /api/form-fill/session/:sessionId - Get session info
router.get("/session/:sessionId", authenticate, async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: "Session ID is required",
      });
    }

    // Get user ID from authenticated request
    const userId = req.user.uid;

    // Get session info
    const sessionInfo = getSession(sessionId, userId);

    return res.status(200).json({
      success: true,
      session: sessionInfo,
    });
  } catch (error) {
    console.error("Error in session info endpoint:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Error retrieving session information",
    });
  }
});

module.exports = router;
