var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    name: String,
    aboutMe: String,
    myInterests: String,
    subforums: [String],
    threads: [Number],
    ownedSubforum: [String]
});

module.exports = mongoose.model('User', UserSchema);