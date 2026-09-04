const passport = require("passport");
const express = require("express");
const router = express.Router();
const {
  showSignupForm,
  showLoginForm,
  handleSignup,
  handleLogin,
  Logout,
  handleGoogleCallback,
} = require("../controllers/authController");
const validateSignup = require("../middleware/signupValidator");
const loginValidator = require("../middleware/authValidator");
const { handleValidationErrors } = require("../middleware/validationHandler");

router.get("/home", (req, res) => {
  res.render("../views/home");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/auth/login" }),
  handleGoogleCallback
);

router.get("/auth/signup", showSignupForm); // renders signup form
router.get("/auth/login", showLoginForm); // renders login form

router.get("/auth/logout", Logout); //logout user
router.post(
  "/auth/signup",
  validateSignup,
  handleValidationErrors,
  handleSignup
); // handles signup
router.post("/auth/login", loginValidator, handleValidationErrors, handleLogin);

module.exports = router;
