const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// auth routes
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes call
app.use("/", authRoutes);
app.use("/", homeRoutes);
app.use("/api", apiRoutes);

// ---------------- ROUTES ----------------

// Home
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "login.html"));
// });

//Home page
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// Selling page
app.get("/selling", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "selling.html"));
});

// Storage page
app.get("/storage", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "storage.html"));
});

// Market (Live Market Prices)
app.get("/market", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "market.html"));
});

// Buy Page
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
// app.get("/privacy", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "privacy.html"));
// });

// Terms
// app.get("/terms", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "terms.html"));
// });

// -------------- START SERVER --------------
app.listen(PORT, () => {
  console.log("✅ Server running at http://localhost:3000");
});
