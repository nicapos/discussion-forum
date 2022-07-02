var mongoose = require('mongoose');

var ThreadSchema = new mongoose.Schema({
    // TODO create a Schema for Posts
    subforumName: String,
    threadTitle: String,
    username: String,
    datePosted: Date,
    body: String,
    likes: Number,
    replies: [mongoose.Types.ObjectId]
});

module.exports = mongoose.model('Thread', ThreadSchema);
