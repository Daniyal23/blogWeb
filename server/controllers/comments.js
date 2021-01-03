const express = require("express");
const router = express.Router();
const comments = require("../models/Comment");

module.exports = {

    addComments: async (req, res) => {
        try {
            const newComment = new Comments(
                {

                    id: req.body.id,
                    commentorId: req.body.commentorId,
                    Avatar: req.body.Avatar,
                    content: req.body.content,
                    likes: req.body.likes,
                    dislikes: req.body.dislikes,
                    interactionList: req.body.interactionList,
                    reportsCounter: req.body.reportsCounter,
                    datePublished: req.body.datePublished,
                    dateUpdated: req.body.dateUpdated,
                    commentorUserName: req.body.commentorUserName,

                }
            );
            await newComment.save()
                .then(comments => res.json(comments._id))
        } catch (err) {
            console.log(err, "tis is error")
            res.status(500).send('Server error');
        }

    },

    getAllComments: async (req, res) => {
        //console.log("in list all");
        try {
            Comments.find()
                .then(comments => {
                    if (!comments) {
                        // console.log("error");
                        return res.status(404).json(errors);
                    }
                    // console.log("done");
                    res.json(comments);
                })
                .catch(err => res.status(404).json(
                    //console.log(err),
                    {

                        comment: 'There are no comments'
                    }));
        } catch (err) {
            console.log(err, "tis is error")
            res.status(500).send('Server error');
        }
    },

    getCommentsById: async (req, res) => {
        //console.log(req.param.id)
        try {
            Comments.findOne({ '_id': (req.params.id) })
                .then(comnt => res.json(comnt))
                .catch(err =>
                    res.status(404).json({
                        nocommentfound: "no comment found with that id"
                    })
                );
        } catch (err) {
            console.log(err, "tis is error")
            res.status(500).send('Server error');
        }
    },

    deleteComment: async (req, res) => {
        try {
            Comments.findOneAndDelete({ '_id': req.params.id })
                .then(dealer => {
                    res.json("Deleted Successfully");
                    //return res.json({ error: "username already exists" });
                })
                .catch(err =>
                    res.json({
                        nocommentfound: "no Comment found with that id"
                        //id: req.params.id
                    })
                );
        } catch (err) {
            console.log(err, "tis is error")
            res.status(500).send('Server error');
        }
    },
}
