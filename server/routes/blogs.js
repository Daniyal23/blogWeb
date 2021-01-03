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
    async (req, res) => {
        try {
            const newBlog = new Blog(
                {

                    id: req.body.id,
                    creatorId: req.body.creatorId,
                    title: req.body.title,
                    blogHeaderImage: req.body.blogHeaderImage,
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
            await newBlog.save()
                .then(blog => res.json(blog))
        } catch (err) {
            res.status(500).send('Server error');
        }

    }


);
router.get("/getAllBlogs",
    // passport.authenticate("jwt", {
    //     session: false
    // }),
    (req, res) => {
        //console.log("in list all");
        Blog.find()
            .then(blogs => {
                if (!blogs) {
                    //console.log("error");
                    return res.status(404).json(errors);
                }
                //console.log("done");
                res.json(blogs);
            })
            .catch(err => res.status(404).json(
                //console.log(err),
                {

                    dealer: 'There are no blogs'
                }));

    });

router.get("/getBlogs/:id",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        //console.log(req.param.id)
        Blog.findOne({ '_id': (req.params.id) })
            .then(blog => res.json(blog))
            .catch(err =>
                res.status(404).json({
                    noblogfound: "no blog found with that id"
                })
            );
    });

router.post("/update/:id", passport.authenticate("jwt", {
    session: false
}),
    async (req, res) => {
        try {
            Blog.findById(req.params.id)
                .then(blog => {

                    blog.id = req.body.id,
                        blog.creatorId = req.body.creatorId,
                        blog.title = req.body.title,
                        blog.blogHeaderImage = req.body.blogHeaderImage,
                        blog.text = req.body.text,
                        blog.images = req.body.images,
                        blog.creatorName = req.body.creatorName,
                        blog.dateSubmitted = req.body.dateSubmitted,
                        blog.datePublished = req.body.datePublished,
                        blog.dateUpdated = req.body.dateUpdated,
                        blog.isApproved = req.body.isApproved,
                        blog.numLikes = req.body.numLikes,
                        blog.numDislikes = req.body.numDislikes,
                        blog.reportsCounter = req.body.reportsCounter,
                        blog.interactionIdList = req.body.interactionIdList,
                        blog.commentsIdList = req.body.commentsIdList,
                        blog.numOfReads = req.body.numOfReads,
                        blog.status = req.body.status,

                        blog
                            .save()
                            .then(blog => {
                                res.json('Update complete')
                            })
                })
        }
        catch (err) {
            res.status(500).send('Server error');
        }

    })
    router.delete("/delete/:id", passport.authenticate("jwt", {
        session: false
    }),
        (req, res) => {
            Blog.findOneAndDelete({ '_id': req.params.id })
                .then(blog => {
                    res.json("Deleted Successfully");
                    //return res.json({ error: "username already exists" });
                })
                .catch(err =>
                    res.json({
                        noblogfound: "no blog found with that id"
                        //id: req.params.id
                    })
                );
        });



module.exports = router;