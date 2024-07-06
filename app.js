if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./Utils/expressError");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash"); 
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user");
const ListingsRouter = require("./routes/listing");
const reviewsRouter = require("./routes/review");
const subscribeRouter = require("./routes/subscriber");
const userRouter = require("./routes/user");

DbUrl = process.env.AtlasDb_Url;
// Connect to the database
main()
.then(() => {
    console.log("connected to the mongoDb");
})
.catch((err) => {
    console.log(err); 
});

async function main() {
    await mongoose.connect(DbUrl);
}

// Session configuration     

const store = MongoStore.create({
    mongoUrl: DbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("ERROR IN THE MONGO SESSSION STORE",err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

// Middleware setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session(sessionOptions));
app.use(flash());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/assets")));

app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Routes
// app.get("/", (req, res) => {
//     res.render("listing/home.ejs");
// });

app.use("/listings", ListingsRouter); 
app.use("/listings/:id/reviews", reviewsRouter); 
app.use("/subscribe", subscribeRouter);
app.use("/", userRouter);

// Catch all handler for any other route
// app.all("*", (req, res, next) => {
//     next(new expressError(404, "There is some error in this page"));
// });

// Error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "something went wrong!" } = err;
    res.status(statusCode).render('listing/error', { message });
});

// Start the server
app.listen(8080, () => {
    console.log("server is listening to port 8080");
});
