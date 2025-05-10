const express = require("express");
const router = express.Router();
const { auth, admin } = require("../config/firebase"); // Import admin

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const {
      email,
      password,
      full_name, // Added required fields
      phone,
      preferred_language,
      country_of_origin,
      current_city_district,
      native_language,
      gender, // Added optional fields
      date_of_birth,
      arrival_date_turkey,
      marital_status,
      education_level,
      additional_languages,
    } = req.body;

    // Basic validation for required fields
    if (!email || !password || !full_name || !phone || !preferred_language || !country_of_origin || !current_city_district || !native_language) {
      return res.status(400).json({ error: "Missing required fields" }); // Updated error message
    }

    // Create user with Firebase Admin SDK
    const userRecord = await auth.createUser({
      email,
      password,
      emailVerified: false,
    });

    return res.status(201).json({
      success: true,
      uid: userRecord.uid,
      message: "User created successfully (Firestore document creation skipped)",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    // Check for specific Firebase Auth errors
    if (error.code) {
      if (error.code === 'auth/email-already-in-use') {
         return res.status(400).json({
           error: "Email already in use",
         });
      }
      // Handle other Firebase Auth errors as needed
      console.error("Firebase Auth error code:", error.code);
    }

    // If userRecord was created before the error, attempt to delete it for cleanup
    if (typeof userRecord !== 'undefined' && userRecord && userRecord.uid) {
      console.log(`Attempting to delete Firebase Auth user ${userRecord.uid} due to an error.`);
      try {
        await auth.deleteUser(userRecord.uid);
        console.log(`Deleted Firebase Auth user ${userRecord.uid} successfully.`);
      } catch (deleteError) {
        console.error(`Error deleting Firebase Auth user ${userRecord.uid}:`, deleteError);
      }
    } else {
       console.log("userRecord was not defined when an error occurred.");
    }

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

// POST /api/auth/verify-id-token - Verify Firebase ID token on the backend (Secure for production)
router.post("/verify-id-token", async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: "ID token is required" });
    }

    // Verify the ID token with Firebase Admin SDK
    // This is the standard and recommended secure way to authenticate users on the backend
    // after they have signed in on the client-side using a Firebase client SDK.
    const decodedToken = await auth.verifyIdToken(idToken);

    // The decodedToken contains the user's UID and other claims
    return res.status(200).json({
      success: true,
      uid: decodedToken.uid,
      email: decodedToken.email, // Include email from token
      // You can include other claims from decodedToken as needed
      message: "ID token verified successfully",
    });

  } catch (error) {
    console.error("Error verifying ID token:", error);
    // Handle specific token verification errors
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        error: "ID token expired",
      });
    }
    if (error.code === 'auth/id-token-revoked') {
      return res.status(401).json({
        error: "ID token revoked",
      });
    }
    // Handle other verification errors
    return res.status(401).json({
      error: "Invalid ID token",
      message: error.message, // Include error message for debugging
    });
  }
});


module.exports = router;
