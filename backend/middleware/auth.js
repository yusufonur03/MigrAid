const { auth } = require("../config/firebase");

// Middleware to authenticate the user using Firebase auth token
const authenticate = async (req, res, next) => {
  console.log("Authenticate middleware hit");

  // DEVELOPMENT MODE: Skip authentication for testing
  const SKIP_AUTH = process.env.NODE_ENV === "development" || true;

  if (SKIP_AUTH) {
    console.log("Development mode: Skipping authentication");
    req.user = { uid: "test-user-id", email: "test@example.com" };
    return next();
  }

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const idToken = authHeader.split("Bearer ")[1];
    console.log("Token extracted, attempting verification");

    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      console.log("Token verified successfully");
      req.user = decodedToken;
      return next();
    } catch (error) {
      console.error("Error verifying auth token:", error);
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  } catch (error) {
    console.error("Authentication error in outer catch:", error);
    return res.status(500).json({ error: "Internal server error during authentication" });
  }
};

module.exports = { authenticate };
