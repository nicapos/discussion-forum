var mongoose = require('mongoose');

var LikesSchema = new mongoose.Schema({
    //reference to user and thread models ??
    username: String,
    threadID: Number
});

module.exports = mongoose.model("Likes", LikesSchema);