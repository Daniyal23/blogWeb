const express = require("express");
const router = express.Router();
const comments = require("../../../models/Comment");
const HTTPRESPONSE = require('../../../utils/httpResponses');


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
                    reportlistList: req.body.reportlistList,
                }
            );
            const data = await newComment.save()
            if (data) {
                return HTTPRESPONSE.CREATED('Blog created successfully', data._id);
            }
        } catch (error) {
            return HTTPRESPONSE.CONFLICT('Error occurred', error);
        }

    },



    getAllComments: async (req, res) => {

        try {
            let comments = await Comments.find()
            if (comments) {

                return HTTPRESPONSE.SUCCESS('Comment list found', comments);
            }
            else {
                return HTTPRESPONSE.NOT_FOUND('Comments not found', {
                    error: 'Comments not found',
                });
            }
        } catch (error) {
            return HTTPRESPONSE.CONFLICT('Error occurred', error);
        }
    },


    getCommentsById: async (req, res) => {

        try {
            let comnt = await Comments.findOne({ '_id': (req.params.id) })
            if (comnt) {
                return HTTPRESPONSE.SUCCESS('Comment found', comnt);
            }
            else {
                return HTTPRESPONSE.NOT_FOUND('Comment not found', {
                    error: 'Comment not found',
                });
            }
        } catch (error) {
            return HTTPRESPONSE.CONFLICT('Error occurred', error);
        }
    },

    deleteComment: async (req, res) => {
        try {
            let comment = await Comments.findOneAndDelete({ '_id': req.params.id })
            if (comment) {
                return HTTPRESPONSE.SUCCESS('Deleted Successfully');
            }
            else {
                return HTTPRESPONSE.NOT_FOUND('Comment not found', {
                    error: 'Comment not found',
                });
            }
        } catch (error) {
            return HTTPRESPONSE.CONFLICT('Error occurred', error);
        }
    },
    updateComment: async (req, res) => {
        try {

            let cmt = await Comments.findById(req.params.id)
            if (cmt) {

                cmt.id = req.body.id,
                    cmt.commentorId = req.body.commentorId;
                cmt.Avatar = req.body.Avatar;
                cmt.content = req.body.content;
                cmt.likes = req.body.likes;
                cmt.dislikes = req.body.dislikes;
                cmt.interactionList = req.body.interactionList;
                cmt.reportsCounter = req.body.reportsCounter;
                cmt.datePublished = req.body.datePublished;
                cmt.dateUpdated = req.body.dateUpdated;
                cmt.commentorUserName = req.body.commentorUserName;
                cmt.reportlistList = req.body.reportlistList;

                const data = await cmt.save()
                return HTTPRESPONSE.SUCCESS('Update complete');

            }

        } catch (error) {
            return HTTPRESPONSE.CONFLICT('Error occurred', error);
        }
    }
}
