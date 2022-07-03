const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Thread = require('../models/ThreadModel.js');
const Reply = require('../models/ReplyModel.js');
const Subforum = require('../models/SubforumModel.js');
const Image = require('../models/ImageModel.js');

const bcrypt = require('bcrypt');

const settingsController = {
    getSettings: function(req, res){
        var username = req.session.username;

        db.findOne(User, {username: username}, "name username email", function(result){
            result = JSON.parse(JSON.stringify(result));
            
            res.render('editAccount', result);
        })
    },
    getChangeUsername: function(req, res){
        var username = req.session.username;

        db.findOne(User, {username: username}, {name: 1, username: 1, email: 1}, function(result){
            let query = {
                name: result.name,
                username: username,
                email: result.email
            }
            res.render('changeUsername', query);
        }) 
    },
    postChangeUsername: function(req, res){
        var username = req.session.username;
        var newUsername = req.body.newUsername;
        
        db.updateMany(Thread, {username: username}, {$set:{"username":newUsername}}, function(result){
        })

        db.updateMany(Subforum, {members: username}, {$set:{"members.$":newUsername}}, function(result){
        })

        db.updateMany(Reply, {username: username}, {$set:{"username":newUsername}}, function(result){
        })

        db.updateMany(Image, {name: username}, {$set:{"name": newUsername}}, function(result){
            
        })

        db.updateOne(User, {username: username}, {$set:{"username": newUsername}}, function(result){
            req.session.username = newUsername;
            res.redirect('/settings');
        })
            
    },

    getChangePassword: function(req, res){
        var username = req.session.username;

        db.findOne(User, {username: username}, {name: 1, username: 1, email: 1}, function(result){
            let query = {
                name: result.name,
                username: username,
                email: result.email
            }
            res.render('changePassword', query);
        }) 
    },

    postChangePassword: function(req, res){
        var username = req.session.username;
        bcrypt.hash(req.body.newPassword, 10, function(err, hash){
            console.log(hash);
            db.updateOne(User, {username: username}, {$set:{"password": hash}}, function(result){
                console.log(result);
                res.redirect('/settings');
            })
        })
    }


}

module.exports = settingsController;