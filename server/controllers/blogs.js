const express = require("express");
const bcrypt = require("bcryptjs");
const Blog = require("../models/Blog");

module.exports = {
    addBlog: (async (req, res) => {
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

    }),


    getAllBlogs: (async (req, res) => {
        //console.log("in list all");
        try {
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
        }

        catch (err) {
            res.status(500).send('Server error');
        }


    }),

    getBlogsById: (async (req, res) => {
        //console.log(req.param.id)
        try {
            Blog.findOne({ '_id': (req.params.id) })
                .then(blog => res.json(blog))
                .catch(err =>
                    res.status(404).json({
                        noblogfound: "no blog found with that id"
                    })
                );
        } catch (err) {
            res.status(500).send('Server error');
        }
    }),


    updateBlog: async (req, res) => {
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

    },
    deleteBlog: async (req, res) => {
        try {
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
        } catch (err) {
            //console.log(err, "ttis is error")
            res.status(500).send('Server error');
        }
    },

}
