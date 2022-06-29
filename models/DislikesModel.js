var mongoose = require('mongoose');

var DislikesSchema = new mongoose.Schema({
    //reference to user and thread models ?? 
    username: String,
    threadID: Number
});

module.exports = mongoose.model("Dislikes", DislikesSchema);