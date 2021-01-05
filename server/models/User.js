const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({

    UserName: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        unique: true,
        required: true
    },

    Password: {
        type: String,
        required: true
    },
    Avatar: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        default:"regular"
    },
    status: {
        type: String,
        default:"notapproved"
        
        
    },

});

module.exports = User = mongoose.model('users', UserSchema);