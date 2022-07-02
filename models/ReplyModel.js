var mongoose = require('mongoose');

var ReplySchema = new mongoose.Schema({
    threadId: mongoose.Types.ObjectId,
    username: String,
    datePosted: Date,
    body: String,
});

module.exports = mongoose.model('Reply', ReplySchema);