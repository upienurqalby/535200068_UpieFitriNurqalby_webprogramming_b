const express = require("express");
const router = express.Router();

router.get("/login", async (req, res) => {
  
  // If the user has logged-in, redirect to index
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("pages/login", { layout: false });
  }
});

router.post("/login", async (req, res) => {
  
  // Get user input
  const username = req.body.username;
  const password = req.body.password;

  if (username === "admin" && password === "admin") {
    
    // Implement sessions to check user is logged-in
    req.session.user = "admin";

    // Redirect to member area
    res.redirect("/");
  } else {
    
    // Render the login page with error information
    res.render("pages/login", {
      layout: false,
      error: "Wrong username or password.",
    });
  }
});

router.get("/logout", async (req, res) => {
  
  // Destroy all session
  req.session.destroy();

  // Redirect to login
  res.redirect("/auth/login");
});

module.exports = router;