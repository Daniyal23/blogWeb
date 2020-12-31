const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CommentSchema = new Schema({

    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    commentorID: {
        type:String,
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
    },
    dislikes: {
        type: Number,
        required: true
    },
    datePublished: {
        type: Date,
        //required: true
    },
    dateUpdated: {
        type: Date,
        //required: true
    },
    interactionIdList: {
        type: Number,
        //required: true
    },
    reportsCounter: {
        type: Number,
        //required: true
    },
    

});

module.exports = Comment = mongoose.model('comments', CommentSchema);