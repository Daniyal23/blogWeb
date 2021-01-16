const express = require("express");
const router = express.Router();
const comments = require("../../../models/Comment");

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
            if(data){
                console.log(data._id,"here man here");
                return res.json( data._id );
            }
            
                
        } catch (err) {
            //console.log(err, "tis is error")
            return res.status(500).send('Server error');
        }

    },

    getAllComments: async (req, res) => {
        //console.log("in list all");
        try {
          let comments=await Comments.find()
                if(comments) {
                    if (!comments) {
                        // console.log("error");
                        return res.status(404).json(errors);
                    }
                    // console.log("done");
                   return res.json(comments);
                }
                else{  return res.status(404).json(
                    //console.log(err),
                    {

                        comment: 'There are no comments'
                    })}
        } catch (err) {
            //console.log(err, "tis is error")
            res.status(500).send('Server error');
        }
    },

    getCommentsById: async (req, res) => {
        //console.log(req.param.id)
        try { let comnt = await Comments.findOne({ '_id': (req.params.id) })
                if(comnt) return res.json(comnt);
                else{
                  return  res.status(404).json({
                        nocommentfound: "no comment found with that id"
                    })
                }
        } catch (err) {
            //console.log(err, "tis is error")
            res.status(500).send('Server error');
        }
    },

    deleteComment: async (req, res) => {
        try { 
            let comment = await Comments.findOneAndDelete({ '_id': req.params.id })
                if(comment) {
                  return  res.json("Deleted Successfully");
                    //return res.json({ error: "username already exists" });
                }
                else{
                 return   res.json({
                        nocommentfound: "no Comment found with that id"
                        //id: req.params.id
                    })
                
        }} catch (err) {
            //console.log(err, "tis is error")
            res.status(500).send('Server error');
        }
    },
    updateComment: async (req, res) => {
        try {
            //console.log("in update")
            let cmt = await Comments.findById(req.params.id)
                if(cmt) {


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
                return res.json( 'Update complete' );





                }

        } catch (err) {
            return res.status(500).send('Server error');
        }
    }
}
