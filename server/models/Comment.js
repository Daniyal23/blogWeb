const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CommentSchema = new Schema({


    title: {
        type: String,
        required: true
    },
    commentorId: {
        type: String,
        required: true
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
        //required: true
    },
    datePublished: {
        type: Date,
        //required: true
    },
    dateUpdated: {
        type: Date,
        //required: true
    },
    interactionList: {
        type: Schema.Types.Mixed,
        //required: true
    },
    reportsCounter: {
        type: Number,
        //required: true
    },


});

module.exports = Comments = mongoose.model('comments', CommentSchema);