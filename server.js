const express = require("express");
const path = require("path");
const app = express();

// Static files (public folder)
app.use(express.static("public"));

// ---------------- ROUTES ----------------

// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// Selling
app.get("/selling", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "selling.html"));
});

// Storage
app.get("/storage", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "storage.html"));
});

// Market (Live Market Prices)
app.get("/market", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "market.html"));
});

// ✅ Buy Crops
app.get("/buy", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "buy.html"));
});

// Transaction History
app.get("/history", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "history.html"));
});

// Profile
app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "profile.html"));
});

// About
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

// Contact
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});

// Privacy
app.get("/privacy", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "privacy.html"));
});

// Terms
app.get("/terms", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "terms.html"));
});

// -------------- START SERVER --------------
app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
