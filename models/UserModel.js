var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    aboutMe: String,
    myInterests: String,
    subforums: [Number],
    threads: [Number]
});

module.exports = mongoose.model('User', UserSchema);