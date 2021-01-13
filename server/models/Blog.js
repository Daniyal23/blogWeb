const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const BlogSchema = new Schema({

    creatorId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    blogHeaderImage: {
        type: Schema.Types.Mixed,
    },
    text: {
        type: String,
        required: true
    },
    images: {
        type: Schema.Types.Mixed,
    },
    creatorName: {
        type: String,
        required: true
    },
    dateSubmitted: {
        type: Date,
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
    isApproved: {
        type: Boolean,
        required: true
    },
    numLikes: {
        type: Number,
        //required: true
    },
    numDislikes: {
        type: Number,
        //required: true
    },
    reportsCounter: {
        type: Number,
        //required: true
    },
    interactionIdList: {
        type: Schema.Types.Mixed,
    },
    reportlistList: {
        type: Schema.Types.Mixed,
    },

    commentsIdList: {
        type: Schema.Types.Mixed,
    },
    numOfReads: {
        type: Number,
        //required: true,
    },
    status: {
        type: String,
        required: true
    },

});

module.exports = Blog = mongoose.model('blogs', BlogSchema);