const express = require("express");
const passport = require("passport");
const router = express.Router();
const db = require("../models");
const webToken = require("jsonwebtoken");

router.get("/api/tracker/user_data",
    passport.authenticate("jwt", { session: true }),
    async (req, res) => {
        try {
            const jwt = req.cookies.jwt;
            const decoded = webToken.verify(jwt, "i want to believe")
            console.log(jwt);
            console.log(decoded);
            const data = await db.account.findOne({ where: { email: decoded.email } });
            res.json(data);
        } catch (error) {
            console.error(error);

            res.status(500).send();
        }
    });

router.put("/api/tracker/user_data",
    passport.authenticate("jwt", { session: true }),
    async (req, res) => {
        try {
            console.log(req.body);
            const jwt = req.cookies.jwt;
            const decoded = webToken.verify(jwt, "i want to believe");
            db.account.update(
                { total_time: req.body.total_time, total_earnings: req.body.total_earnings },
                { where: { email: decoded.email } }
            )
        } catch (error) {
            console.error(error);

            res.status(500).send();
        }
    })

module.exports = router;