const express = require("express");
const router = express.Router();
const { auth } = require("../config/firebase");

// GET /api/auth/test - Test endpoint (no authentication)
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes are working!" });
});

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Create user with Firebase Admin SDK
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: displayName || null,
      emailVerified: false,
    });

    return res.status(201).json({
      success: true,
      uid: userRecord.uid,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      error: error.message || "An error occurred during user creation",
    });
  }
});

// POST /api/auth/verify-token
router.post("/verify-token", async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: "ID token is required" });
    }

    // Verify the ID token with Firebase Admin SDK
    const decodedToken = await auth.verifyIdToken(idToken);

    return res.status(200).json({
      success: true,
      uid: decodedToken.uid,
      email: decodedToken.email,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({
      error: "Invalid token",
    });
  }
});

module.exports = router;
