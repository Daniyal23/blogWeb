const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { Result, check } = require("express-validator");
const { response } = require("express");



dotenv.config();
/*
router.get("/test", (req, res) =>
    res.json({
        msg: "User Works"
    })
);
*/

//@route    GET api/users/register
//@desc     Register user route
//@access   Public
module.exports = {

    signup: async (req, res) => {
        try {
            let { UserName, Email, Password, Country, Avatar } = req.body;
            let FoundUser = {};
            const user = await User.findOne({
                UserName,
            });
            if (user) return res.json('Username already exists');

            let users = await User.find();
            const checkmail = await Promise.all(users.map(user => bcrypt.compare(Email, user.Email)));
            checkmail.map((response, index) => { if (response) FoundUser = users[index] });
            if (FoundUser._id) return res.json('email already exists');

            const salt = await bcrypt.genSalt(10);
            Email = await bcrypt.hash(Email, salt);
            Password = await bcrypt.hash(Password, salt);
            const newUser = new User({
                UserName,
                Email,
                Password,
                Country,
                Avatar
            });
            await newUser.save(function (error, obj) {
                if (error) res.send(error);
                return res.json({ success: 'Added' });
            });
        } catch (err) {
            res.status(500).send('Server error');
        }
    },


    //@route    GET api/users/login
    //@desc     Login user / Return JWT token
    //@access   Public
    login: async (req, res) => {

        try {
            var temp = false;
            var email = req.body.Email;
            var temp2 = false;
            const password = req.body.Password;

            User.find()
                .then(users => {
                    if (!users) {
                        return res.json({ error: "Password incorrect" });
                    }
                    users.forEach((item) => {
                        //console.log(item.Email, "jeje");
                        temp = bcrypt.compareSync(email, item.Email);
                        if (temp == true) {
                            temp2 = bcrypt.compareSync(password, item.Password)
                            if (temp2 == true) {
                                //User Matched

                                const payload = {
                                    id: item.id,
                                    username: item.UserName,
                                    //name: user.name,
                                    avatar: item.Avatar
                                    //perm: user.perm
                                }; // Create Jwt payload

                                //Sign Token
                                jwt.sign(
                                    payload,
                                    process.env.secretOrKey,
                                    {
                                        expiresIn: 3600 * 4
                                    },
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            token: "Bearer " + token

                                        });
                                    })

                            }
                        }
                        else {
                            temp == false;

                        }

                    })
                    // console.log(temp,temp2,"this is the error  ")

                    if (temp2 == false) {
                        return res.json({ error: "Password incorrect" });
                    }


                });
        } catch (err) {
            res.status(500).send('Server error');
        }

    },

    getAllUsers: async (req, res) => {
        try {
            User.find()
                .then(users => {
                    if (!users) {
                        return res.status(404).json(errors);
                    }
                    res.json(users);
                })
                //return res.json({ error: "Password incorrect" });
                .catch(err => res.json({
                    user: 'There are no users'
                }));
        } catch (err) {
            res.status(500).send('Server error');
        }

    },




    deleteUsers: async (req, res) => {
        try {
            User.findOneAndDelete({ '_id': req.params.id })
                .then(user => {
                    res.json("Deleted Successfully");
                })
                .catch(err =>
                    res.status(404).json({
                        nouserfound: "no user found with that id",
                        id: req.params.id
                    })
                );
        }
        catch (err) {
            res.status(500).send('Server error');
        }
    },


    getUsersById: async (req, res) => {
        try {
            console.log(req.param.id)
            User.findOne({ '_id': (req.params.id) })
                .then(user => res.json(user))
                .catch(err =>
                    res.status(404).json({
                        nouserfound: "no user found with that id"
                    })
                );
        } catch (err) {
            res.status(500).send('Server error');
        }
    },

    getUserAccountType: async (req, res) => {
        try {
            console.log(req.param.id)
            User.findOne({ '_id': (req.params.id) })
                .then(user => res.json(user.accountType))
                .catch(err =>
                    res.status(404).json({
                        nouserfound: "no user found with that id"
                    })
                );
        } catch (err) {
            res.status(500).send('Server error');
        }
    },


    updateUser: async (req, res) => {
        try {
            console.log("in update")
            User.findById(req.params.id)
                .then(user => {
                    user.UserName = req.body.UserName;
                    user.Password = req.body.Password;
                    user.Avatar = req.body.Avatar;
                    user.status = req.body.status;
                    user.Country = req.body.Country;
                    user.accountType = req.body.accountType;
                    user.Email = req.body.Email;


                    user
                        .save()
                        .then(user => {
                            res.json('Update complete')
                        })
                        .catch(err =>
                            res.status(404).json({
                                nouserfound: "no user found with that id"
                            })
                        );




                })

        } catch (err) {
            res.status(500).send('Server error');
        }
    }

}
