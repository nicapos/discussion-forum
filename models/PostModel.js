var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    // TODO create a Schema for Posts
    postID: Number,
    title: String,
    postedBy: String,
    datePosted: Date,
    body: String,
    likes: Number,
    comments: String
});

module.exports = mongoose.model('Post', PostSchema);
