const db = require('../models/db.js');
const Thread = require('../models/ThreadModel.js');
const Reply = require('../models/ReplyModel.js');
const Subforum = require('../models/SubforumModel.js');
const User = require('../models/UserModel.js');
const mongoose = require('mongoose');
const moment = require('moment');

const forumController = {

    checkSubforum: function(req, res){
        db.findOne(Subforum, req.query, "", function(result){
            res.send(result);
        })
    },

    getAddSubforum: function (req, res) {
        var user = req.session.username; 
        res.render('createSubforum', {user: user});
    },

    postAddSubforum: function(req, res) {
        var title = req.body.title;
        var desc = req.body.description;
        var name = title.trim().toLowerCase().replace(' ','-');

        var query = {
            subforumName: name,
            title: title,
            description: desc,
            threads: [],
            members: []
        };

        db.insertOne(Subforum, query, function(flag) {
            db.updateOne(Subforum, {subforumName: name},{$push:{"members": req.session.username}}, function(result){
            });
    
            db.updateOne(User, {username: req.session.username},{$push:{"subforums": name}}, function(result){
            });
            
            if (flag)
                res.redirect('/subf/' + name); // Redirect to newly created subforum
        });        
    },

    getSubforum: function(req, res) {
        var user = req.session.username; 
        var subfName = req.params.subfName;

        db.findOne(Subforum, {subforumName: subfName}, "subforumName title description members", function (result) {
            let subforum = JSON.parse(JSON.stringify(result));

            subforum.isUserMember = subforum.members.includes(user);

            db.findMany(Thread, {subforumName: subfName}, "_id threadTitle subforumName username datePosted body likes", function(result){
                var threads = JSON.parse(JSON.stringify(result));
                threads.forEach(element => {
                    element.datePosted = moment(element.datePosted).calendar();  
                });
                res.render('subforumView', {user: user, subforum: subforum, threads: threads});
            })

            if (!subforum)
                res.render('error');
            });
    },

    joinSubforum: function(req, res){
        var user = req.session.username;
        var subf = req.params.subfName;

        db.updateOne(Subforum, {subforumName: subf}, {$push:{"members":user}}, function(result){
            db.updateOne(User, {username: user}, {$push:{"subforums":subf}}, function(result){
                res.redirect('/subf/'+subf);
            })
        })
    },

    leaveSubforum: function(req, res){
        var user = req.session.username;
        var subfName = req.params.subfName;

        db.updateOne(Subforum, {subforumName: subfName},{$pull: {"members": user}}, function(result){
            console.log(result);
        });

        res.redirect('/subf/'+subfName)

    },

    postUpdateSubforum: function(req, res) {
        // TODO: Update Subforum details
    },

    postDeleteSubforum: function(req, res) {
        // TODO: Delete Subforum
    },

};

module.exports = forumController;