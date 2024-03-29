const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const profileController = {
    getProfile: function(req, res){
        var sessionUser = req.session.username;
        var username = req.params.username;
        
        db.findOne(User, {username: username}, {name: 1, username: 1, aboutMe: 1, myInterests: 1}, function(result){
            let query = result;
            if (query)
                res.render('profile', {user: query, sessionUser: sessionUser, isOwnProfile: sessionUser==query.username});
            else
                res.render('error');
        })
    },

    getEditProfile: function(req, res){
        var username = req.session.username;
        var projection = "username name aboutMe myInterests";

        db.findOne(User, {username: username}, projection, function(result){
            if(!result)
                res.render('error');
            res.render('editProfile', result);
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