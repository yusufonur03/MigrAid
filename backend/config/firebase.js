// Firebase Admin SDK setup
const admin = require("firebase-admin");
require("dotenv").config();

// Initialize Firebase Admin SDK
let app;
try {
  // Try to get the Firebase service account key path from environment variable
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (serviceAccountPath) {
    // Load the service account key from the file path
    const serviceAccount = require(serviceAccountPath);

    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id, // Explicitly use project_id from service account
    });
    console.log(`Firebase initialized with service account from file: ${serviceAccountPath}`);
  } else {
    // Initialize with a simple configuration for development if no service account path env var
    app = admin.initializeApp({
      projectId: "migraid-98aef",
    });
    console.log("Firebase initialized with simple project ID config (no service account path env var)");
  }
} catch (error) {
  console.error("Firebase initialization error:", error.message);
  // Final fallback to basic initialization
  app = admin.initializeApp();
  console.log("Firebase initialized with default config (final fallback)");
}

// Export the auth service
const auth = admin.auth(app);

module.exports = { admin, auth };
