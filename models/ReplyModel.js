var mongoose = require('mongoose');

var ReplySchema = new mongoose.Schema({
    threadID: Number,
    postedBy: String,
    datePosted: Date,
    body: String,
});

module.exports = mongoose.model('Reply', ReplySchema);