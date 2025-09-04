// Right now no database, just structure
// Later we’ll plug MongoDB or MySQL

exports.register = (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.send("<h2>❌ Passwords do not match. <a href='/'>Try again</a></h2>");
  }

  console.log("✅ Registered user:", { username, email });

  res.redirect("/login");
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  console.log("➡️ Login attempt:", { email, password });

  // For now always success
  res.redirect("/home");
};
