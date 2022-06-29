const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const profileController = {
    getProfile: function(req, res){
        var sessionUser = req.session.username;
        var username = req.params.username;
        
        db.findOne(User, {username: username}, {name: 1, username: 1, aboutMe: 1, myInterests: 1}, function(result){
            let query = result;
            res.render('profile', {user: query, sessionUser: sessionUser});
        })
    },

    getEditProfile: function(req, res){
        var username = req.session.username;
        db.findOne(User, {username: username}, {name: 1, email: 1}, function(result){
            res.render('editProfile', {name: result.name, email: result.email, username: username});
        })
    },

    postEditProfile: function(req, res){
        var username = req.session.username;
        var aboutMe = req.body.bio;
        var myInterests = req.body.interests;
        var name = req.body.name;
        db.updateOne(User, {username: req.session.username},{$set:{"name": name, "aboutMe": aboutMe, "myInterests": myInterests}}, function(result){
            console.log(result);
            res.redirect('/user/'+username +'/edit');
        });
    }

}

module.exports = profileController;