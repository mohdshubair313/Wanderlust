const User = require("../models/user");

module.exports.rendersignUpform = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signUpform = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password); 
        console.log(registerUser);

        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.RenderloginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.loginForm = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        return next(err);
    });
    req.flash("success", "you have successfully Logout");
    res.redirect("/listings");
};