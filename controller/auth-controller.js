const passport = require("passport");
const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const router = express.Router();
const jwtSecret = require("../config/jwt-config");

// Flash
router.use(
  session({
    cookie: { maxAge: 6000000 },
    secret: jwtSecret.session_secret,
    saveUninitialized: true,
    resave: true
  })
);
router.use(flash());

// Passport
require("../config/passport")(passport);
router.use(passport.initialize());
router.use(passport.session());

router.use(cookieParser());

router.post(
  "/login",
  passport.authenticate("local-login", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  (req, res) => {
    const payload = {
      email: req.user.email,
      expires: Date.now() + parseInt(60000)
    };

    req.login(payload, { session: false }, error => {
      if (error) {
        res.status(400).send({ error });
      }

      const token = jwt.sign(JSON.stringify(payload), jwtSecret.secret);

      res.cookie("jwt", token, { httpOnly: true, secure: false });
      res.redirect("/tracker");
    });
  }
);

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.get("/logout", async (req, res) => {
  const record = {
    status: "LogOut",
    userId: req.user.dataValues.id
  };

  req.logout();
  res.clearCookie("jwt");
  res.redirect("/");
});

module.exports = router;
