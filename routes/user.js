const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../Utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../AuthMiddleware");
const loginSignupController = require("../controllers/users");


//Routing for the sign up page
router.route("/signup")
.get( loginSignupController.rendersignUpform)
.post( wrapAsync(loginSignupController.signUpform));

//Routing for the Login page
router.route("/login")
.get( loginSignupController.RenderloginForm)
.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), loginSignupController.loginForm)

// Route for the login out 
router.get("/logout", loginSignupController.logout);

module.exports = router;