import express from "express";

const router = express.Router();

// @route   POST /api/auth/login
// @desc    User Login
// @access  Public
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Placeholder logic
  if (username === "admin" && password === "admin123") {
    return res.status(200).json({
      message: "Login successful",
      token: "placeholder-jwt-token-xyz",
      user: { id: 1, username: "admin", role: "Administrator" }
    });
  }

  return res.status(401).json({ message: "Invalid username or password" });
});

// @route   GET /api/auth/status
// @desc    Get Current Auth Status
// @access  Public
router.get("/status", (req, res) => {
  res.status(200).json({ status: "Ready", message: "Auth service is running" });
});

export default router;
