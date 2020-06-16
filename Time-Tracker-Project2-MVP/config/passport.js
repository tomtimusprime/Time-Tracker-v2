const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const jwtSecret = require("./jwt-config");
const db = require("../models");

module.exports = passport => {
  passport.serializeUser((account, cb) => {
    cb(null, account.id);
  });

  passport.deserializeUser(async (id, cb) => {
    const data = await db.account.findOne({ where: { id: id } });

    cb(null, data);
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
        session: true
      },
      async (req, email, password, cb) => {
        let data = await db.account.findOne({ where: { email: email } });
        console.log(req.body);
        if (data) {
          return cb(null, false, {
            message: "Oops! Email already signed-up."
          });
        } else {
          data = await db.account.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            wage: req.body.wage,
            email: email,
            password: await db.account.generateHash(password)
          });

          // const record = {
          //   status: "SignUp",
          //   userId: data.dataValues.id
          // };

          // data = await db.history.create(record);

          return cb(null, data);
        }
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "inputEmail",
        passwordField: "inputPassword",
        session: false
      },
      async (email, password, cb) => {
        let data = await db.account.findOne({ where: { email: email } });

        if (!data) {
          return cb(null, false, { message: "No email found." });
        }
        if (!db.account.validPassword(password, data.password)) {
          return cb(null, false, { message: "Oops! Wrong password!" });
        }

        // const record = {
        //   status: "LogIn",
        //   userId: data.id
        // };

        // await db.history.create(record);

        return cb(null, data);
      }
    )
  );

  const opts = {
    jwtFromRequest: req => {
      return req.cookies.jwt;
    },
    secretOrKey: jwtSecret.secret
  };

  passport.use(
    "jwt",
    new JwtStrategy(opts, async (jwtpayload, cb) => {
      const data = await db.account.findOne({ id: jwtpayload.sub });

      if (data) {
        return cb(null, data);
      } else {
        return cb(null, false, { message: "No user found." });
      }
    })
  );
};
