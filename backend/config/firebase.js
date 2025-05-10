// Firebase Admin SDK setup
const admin = require("firebase-admin");
const path = require('path'); // Import the path module
require("dotenv").config();

// Initialize Firebase Admin SDK
let app;
try {
  const serviceAccountPathFromEnv = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  let serviceAccount;

  if (serviceAccountPathFromEnv) {
    // Resolve the path from the parent directory of the current file's directory (i.e., 'backend/')
    // This handles cases where FIREBASE_SERVICE_ACCOUNT_PATH is like './config/serviceAccountKey.json'
    // or 'config/serviceAccountKey.json' and is intended to be relative to the 'backend' directory.
    const resolvedServiceAccountPath = path.resolve(__dirname, '..', serviceAccountPathFromEnv);
    console.log(`Attempting to load service account from resolved ENV path: ${resolvedServiceAccountPath}`);
    try {
        serviceAccount = require(resolvedServiceAccountPath);
    } catch (e) {
        console.error(`Failed to load service account from resolved ENV path (${resolvedServiceAccountPath}): ${e.message}. Ensure the path is correct and the file exists.`);
        // serviceAccount will remain undefined, leading to fallback initialization
    }
  } else {
    // If ENV path is not set, try to load from a default local path
    const localServiceAccountPath = './serviceAccountKey.json'; // Relative to this file (backend/config/firebase.js)
    try {
      console.log(`ENV path not set. Attempting to load service account from local path: ${localServiceAccountPath}`);
      serviceAccount = require(localServiceAccountPath);
    } catch (localPathError) {
      console.warn(`Failed to load service account from local path (${localServiceAccountPath}): ${localPathError.message}. Ensure the file exists and is valid JSON.`);
      // serviceAccount will remain undefined, leading to fallback initialization
    }
  }

  if (serviceAccount && serviceAccount.project_id) { // Check if serviceAccount was loaded and has project_id
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });
    console.log(`Firebase initialized successfully with service account. Project ID: ${serviceAccount.project_id}`);
  } else {
    // Fallback if no service account could be loaded or is invalid
    console.warn("Service account key not found, failed to load, or invalid. Attempting fallback initialization with project ID.");
    app = admin.initializeApp({
      // Use environment variable for project ID if available, otherwise hardcode
      projectId: process.env.FIREBASE_PROJECT_ID || "migraid-98aef",
    });
    console.log("Firebase initialized with basic project ID config. Firestore database access will likely fail without proper service account credentials.");
  }

} catch (error) { // Catch errors from require() or initializeApp() if they occur outside the specific local file load try-catch
  console.error("Critical Firebase initialization error:", error.message);
  // Final fallback, very unlikely to work for Firestore but keeps app from crashing at this stage
  app = admin.initializeApp(); // Default initialization
  console.log("Firebase initialized with default config (final fallback). Firestore database access will fail.");
}

// Export the auth service and the app instance
const auth = admin.auth(app);

module.exports = { admin, auth, app };
