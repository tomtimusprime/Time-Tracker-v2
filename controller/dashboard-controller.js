const express = require("express");
const passport = require("passport");
const router = express.Router();
const db = require("../models");
const webToken = require("jsonwebtoken");




router.get("/api/dashboard", async (req, res) => {
    try {

        passport.authenticate("jwt", { failureRedirect: "/login" });
        const data = await db.user.findAll();

        res.json(data);
    } catch (error) {
        console.log(error);

        res.status(500).send();
    }
});

// Get route for retrieving a single user
router.get("/api/dashboard/:id", async (req, res) => {

    async (req, res) => {
        try {
            console.log("Iam in the /api/dashboard/:id")
            passport.authenticate("jwt", { session: true }),
            // passport.authenticate("jwt", { failureRedirect: "/login" });
            console.log(req.user);
            const jwt = req.cookies.jwt;
            const decoded = webToken.verify(jwt,"i want to believe");
            console.log(jwt);
            console.log(decoded);
            const data = await db.account.findOne({where:{email: decoded.email}});
            res.json(data);
        } catch (error) {
            console.error(error);

            res.status(500).send();
        }
    // try {
    //     
    //     const data = await db.account.findOne({
    //         where: req.params.id
    //     });

    //     res.json(data);

    // } catch (error) {
    //     console.log(error);

    //     res.status(500).send();
    // }
    };
});

// DELETE route for deleting users. We can access the ID of the user to delete in
// req.params.id
// router.delete("/api/dashboard/:id", async (req, res) => {
//     try {
//         passport.authenticate("jwt", { failureRedirect: "/login" });
//         const data = await db.account.destroy({
//             where: {
//                 id: req.params.id
//             }
//         });

//         res.json(data);

//     } catch (error) {
//         console.log(error);

//         res.status(500).send(error);
//     }
// });

module.exports = router;