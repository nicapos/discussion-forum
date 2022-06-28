var mongoose = require('mongoose');

var ThreadSchema = new mongoose.Schema({
    // TODO create a Schema for Posts
    threadID: Number,
    subforumID: Number,
    threadTitle: String,
    postedBy: String,
    datePosted: Date,
    body: String,
    likes: Number
    //comments
});

module.exports = mongoose.model('Thread', ThreadSchema);
