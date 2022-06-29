var mongoose = require('mongoose');

var LikesSchema = new mongoose.Schema({
  username: String,
  threadID: Number
});

module.exports = mongoose.model("Likes", LikesSchema);