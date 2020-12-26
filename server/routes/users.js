const express = require("express");
const router = express.Router();
//const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

//Load Input Validation
//const validateRegisterInput = require("../../validation/register");
//const validateLoginInput = require("../../validation/login");
//Load User Model
const User = require("../models/User");

router.get("/test", (req, res) =>
    res.json({
        msg: "User Works"
    })
);

router.post("/signup", (req, res) => {

    User.findOne({
        "email": req.body.email
    }).then(user => {
        if (user) {
            //errors.username = "username already exists";
            console.log(user, "sfdf");
            return res.json({ error: "email already exists" });
            //return res.json({ error: "Password incorrect" });
        } else {

            console.log(req.body.UserName, "in ese");
            const newUser = new User({
                //name: req.body.name,
                UserName: req.body.UserName,
                Email: req.body.Email,
                Password: req.body.Password,
                Country: req.body.Country,
                Avatar: req.body.Avatar,



            });
            //console.log(newUser.password, "jeje");

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.Password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.Password = hash;
                });
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.Email, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.Email = hash;
                    newUser
                        .save()
                        .then(user => res.json({ success: "Added" }))
                        .catch(err => { return res.json(err.code) });

                });
            });
        }
    });
});



//@route    GET api/users/login
//@desc     Login user / Return JWT token
//@access   Public
router.post("/login", (req, res) => {


    var email = req.body.Email;

    const password = req.body.Password;

    User.find()
        .then(users => {
            if (!users) {
                return res.status(404).json(errors);
            }

        })


    console.log(email, password, "2");
    //find user by username
    User.findOne({
        'email': email
    }).then(user => {
        //Check for user
        if (!user) {
            //errors.username = "User not found";
            console.log("username error");
            return res.json({ error: "Password incorrect" });
        }

        // Check Password
        bcrypt.compare(password, user.Password).then(isMatch => {
            if (isMatch) {
                //User Matched

                const payload = {
                    id: user.id,
                    //name: user.name,
                    //avatar: user.avatar
                    //perm: user.perm
                }; // Create Jwt payload

                //Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 3600 * 4
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token

                        });
                    }
                );
                console.log("success");
            } else {
                //errors.password = "Password incorrect";
                console.log("pass errir");
                return res.json({ error: "Password incorrect" });
            }
        });
    });
});


module.exports = router;
