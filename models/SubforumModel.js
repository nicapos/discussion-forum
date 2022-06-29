var mongoose = require('mongoose');

var SubforumSchema = new mongoose.Schema({
    // TODO create a Schema for Posts
    subforumName: Number,   // ex. freedom-wall
    title: String,          // ex. Freedom Wall
    threads: [Number],
    members: [String] //usernames
});

module.exports = mongoose.model('Subforum', SubforumSchema);