const express = require("express");
const router = express.Router();
//const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

const Blog = require("../models/Interaction");

router.get("/test", (req, res) =>
    res.json({
        msg: "interaction Works"
    })
);

router.post(
    "/add",
    passport.authenticate("jwt", {
        session: false

    }),
    async (req, res) => {
        try {
            console.log('add interaction');
            const newInteraction = new Interaction(
                {

                    id: req.body.id,
                    InteractionType: req.body.InteractionType,
                    userId: req.body.userId,
                    timestamp: req.body.timestamp,
                    blogId: req.body.blogId,

                }
            );
            await newInteraction.save()
                .then(interact => res.json(interact._id))
        } catch (err) {
            res.status(500).send('Server error');
        }

    }


);


router.get("/getAllBlogs",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        console.log("in list all");
        Blog.find()
            .then(blogs => {
                if (!blogs) {
                    console.log("error");
                    return res.status(404).json(errors);
                }
                console.log("done");
                res.json(blogs);
            })
            .catch(err => res.status(404).json(
                console.log(err),
                {

                    dealer: 'There are no blogs'
                }));

    });

router.get("/getInteractions/:id",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        //console.log(req.param.id)
        Interaction.findOne({ '_id': (req.params.id) })
            .then(interact => res.json(interact))
            .catch(err =>
                res.status(404).json({
                    nointeractionfound: "no interaction found with that id"
                })
            );
    });


module.exports = router;