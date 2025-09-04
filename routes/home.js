const express = require("express");
const path = require("path");
const router = express.Router();

// Dashboard
router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "home.html"));
});

// Live Market Prices
router.get("/market", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "market.html"));
});

// Sell Crops
router.get("/sell", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "sell.html"));
});

// Buy Crops
router.get("/buy", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "buy.html"));
});

// Transaction History
router.get("/history", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "history.html"));
});

module.exports = router;
