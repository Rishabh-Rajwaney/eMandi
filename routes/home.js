const express = require("express");
const router = express.Router();
const path = require("path");

// Selling route
router.get("/selling", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/selling.html"));
});

// Storage route
router.get("/storage", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/storage.html"));
});

module.exports = router;
