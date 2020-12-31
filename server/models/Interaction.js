const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const InteractionSchema = new Schema({

    InteractionType: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        // unique: true,
        required: true
    },

    timestamp: {
        type: Date,
        required: true
    },

    blogId: {
        type: String,
        required: true
    },


    // commentId: (0
});

module.exports = Interaction = mongoose.model('interactions', InteractionSchema);