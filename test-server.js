const express = require("express");
const app = express();

// Simple middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Root route
app.get("/", (req, res) => {
  res.send("Test server is running");
});

// API routes
app.get("/api", (req, res) => {
  res.json({ message: "API endpoint works" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API test endpoint works" });
});

// Auth routes
app.get("/api/auth/test", (req, res) => {
  res.json({ message: "Auth test endpoint works" });
});

// Start server
const port = 3001;
app.listen(port, () => {
  console.log(`Test server running on port ${port}`);
});
