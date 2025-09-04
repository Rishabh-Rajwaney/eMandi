const express = require("express");
const path = require("path");
const router = express.Router();
const authController = require("../controllers/authController");

// Serve Register/Login Page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "index.html"));
});

// Register User
router.post("/register", authController.register);

// Login Page
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "login.html"));
});

// Login User
router.post("/login", authController.login);

module.exports = router;
