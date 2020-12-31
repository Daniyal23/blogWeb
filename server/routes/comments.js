const express = require("express");
const router = express.Router();
//const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

const comments = require("../models/Comment");

router.get("/test", (req, res) =>
    res.json({
        msg: "comments Works"
    })
);

router.post(
    "/add",
    passport.authenticate("jwt", {
        session: false

    }),
    async (req, res) => {
        try {
            const newComment = new Comments(
                {

                    id: req.body.id,
                    commentorId: req.body.commentorId,
                    title: req.body.title,
                    content: req.body.content,
                    likes: req.body.likes,
                    dislikes: req.body.dislikes,
                    interactionList: req.body.interactionList,
                    reportsCounter: req.body.reportsCounter,
                    datePublished: req.body.datePublished,
                    dateUpdated: req.body.dateUpdated,

                }
            );
            await newComment.save()
                .then(comments => res.json(comments._id))
        } catch (err) {
            console.log(err, "tis is error")
            res.status(500).send('Server error');
        }

    }


);
router.get("/getAllComments",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        console.log("in list all");
        Comments.find()
            .then(comments => {
                if (!comments) {
                    console.log("error");
                    return res.status(404).json(errors);
                }
                console.log("done");
                res.json(comments);
            })
            .catch(err => res.status(404).json(
                console.log(err),
                {

                    dealer: 'There are no comments'
                }));

    });

router.get("/getComments/:id",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        //console.log(req.param.id)
        Comments.findOne({ '_id': (req.params.id) })
            .then(comnt => res.json(comnt))
            .catch(err =>
                res.status(404).json({
                    nocommentfound: "no comment found with that id"
                })
            );
    });



module.exports = router;