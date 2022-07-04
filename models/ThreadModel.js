var mongoose = require('mongoose');

var ThreadSchema = new mongoose.Schema({
    subforumName: String,
    threadTitle: String,
    username: String,
    datePosted: Date,
    body: String,
    likes: Number,
    likedBy: [String], // usernames
    dislikedBy: [String], // usernames
    replies: [mongoose.Types.ObjectId]
});

module.exports = mongoose.model('Thread', ThreadSchema);
