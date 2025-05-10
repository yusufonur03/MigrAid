const { auth } = require("../config/firebase");

// Middleware to authenticate the user using Firebase auth token
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      req.user = decodedToken;
      return next();
    } catch (error) {
      console.error("Error verifying auth token:", error);
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Internal server error during authentication" });
  }
};

module.exports = { authenticate };
