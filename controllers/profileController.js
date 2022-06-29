const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const profileController = {
    getProfile: function(req, res){
        var username = req.session.username;
        
        db.findOne(User, {username: username}, {name: 1, username: 1, aboutMe: 1, myInterests: 1}, function(result){
            let query = result;
            console.log(query);
            res.render('profile', query);
        })
    },

    getEditProfile: function(req, res){
        var username = req.session.username;
        db.findOne(User, {username: username}, {name: 1, email: 1}, function(result){
            res.render('editProfile', result);
        })
    },

    postEditProfile: function(req, res){
        var username = req.session.username;
        //TODO add name in User schema
        var aboutMe = req.body.bio;
        var myInterests = req.body.interests;
        var name = req.body.name;
        db.updateOne(User, {username: req.session.username},{$set:{"name": name, "aboutMe": aboutMe, "myInterests": myInterests}}, function(result){
            console.log(result);
            res.redirect('/user/'+username); //render editProfile
        });
    }

}

module.exports = profileController;