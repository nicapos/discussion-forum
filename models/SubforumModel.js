var mongoose = require('mongoose');

var SubforumSchema = new mongoose.Schema({
    subforumName: String,   // ex. freedom-wall
    title: String,          // ex. Freedom Wall
    description: String,
    threads: [String], //replace with Number
    members: [String] //usernames
});

module.exports = mongoose.model('Subforum', SubforumSchema);