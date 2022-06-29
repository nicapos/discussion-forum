const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');

const settingsController = {
    getSettings: function(req, res){
        var username = req.session.username;

        db.findOne(User, {username: username}, {name: 1, username: 1, email: 1}, function(result){
            let query = {
                name: result.name,
                username: username,
                email: result.email
            }
            res.render('editAccount', query);
        })
    }
}

module.exports = settingsController;