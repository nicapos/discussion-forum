var mongoose = require('mongoose');

var SubforumSchema = new mongoose.Schema({
    // TODO create a Schema for Posts
    subforumID: Number,
    subfname: String,
    threads: [Number],
    members: [String] //usernames
});

module.exports = mongoose.model('Subforum', SubforumSchema);