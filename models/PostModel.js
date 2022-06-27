var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    // TODO create a Schema for Posts
});

module.exports = mongoose.model('Post', PostSchema);
