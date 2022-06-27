var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    // TODO create a Schema for Users
});

module.exports = mongoose.model('User', UserSchema);