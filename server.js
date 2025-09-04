const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", authRoutes);
app.use("/", homeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
