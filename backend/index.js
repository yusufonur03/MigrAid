const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Import routes and Firebase auth
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const { auth } = require("./config/firebase"); // Import auth here

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route definitions
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("MigAid Backend is running!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Something went wrong on the server",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
