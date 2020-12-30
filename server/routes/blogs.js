const express = require("express");
const router = express.Router();
//const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

const Blog = require("../models/Blog");

router.get("/test", (req, res) =>
    res.json({
        msg: "blog Works"
    })
);

router.post(
    "/add",
    passport.authenticate("jwt", {
        session: false

    }),
    (req, res) => {
        const newBlog = new Blog(
            {

                id: req.body.id,
                creatorId: req.body.creatorId,
                title: req.body.title,
                blogHeaderImag: req.body.blogHeaderImag,
                text: req.body.text,
                images: req.body.images,
                creatorName: req.body.creatorName,
                dateSubmitted: req.body.dateSubmitted,
                datePublished: req.body.datePublished,
                dateUpdated: req.body.dateUpdated,
                isApproved: req.body.isApproved,
                numLikes: req.body.numLikes,
                numDislikes: req.body.numDislikes,
                reportsCounter: req.body.reportsCounter,
                interactionIdList: req.body.interactionIdList,
                commentsIdList: req.body.commentsIdList,
                numOfReads: req.body.numOfReads,
                status: req.body.status,



            }
        );
        newBlog.save()
            .then(blog => res.json(blog))

    }
);
module.exports = router;