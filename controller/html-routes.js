const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");

// Passport
require("../config/passport")(passport);
router.use(passport.initialize());
router.use(passport.session());

router.get("/", (req, res) => {
    if (req.user) {
        res.sendFile(path.join(__dirname, "../public/login.html"));

    } else {
        res.redirect("/login");
    }
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/tracker", (req, res) => {
    if (req.user) {
        passport.authenticate("jwt", { failureRedirect: "/login" });
        res.sendFile(path.join(__dirname, "../public/tracker.html"));
    } else {
        res.redirect("/login");
    }
});


router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/dashboard", (req, res) => {

    if (req.user) {
        passport.authenticate("jwt", { failureRedirect: "/login" });
        res.sendFile(path.join(__dirname, "../public/dashboard.html"));

    } else {
        res.redirect("/login");
    }

});

module.exports = router;