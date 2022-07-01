var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
    name: String,
    contentType: String,
    size: Number,
    data: Buffer
});

module.exports = mongoose.model("Image", ImageSchema);