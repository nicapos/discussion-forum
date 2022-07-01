const db = require('../models/db.js');
const Thread = require('../models/ThreadModel.js');
const Reply = require('../models/ReplyModel.js');
const Subforum = require('../models/SubforumModel.js');
const User = require('../models/UserModel.js');
const mongoose = require('mongoose');

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

        db.findOne(Subforum, {subforumName: subfName}, "subforumName title description", function (result) {
            let subforum = JSON.parse(JSON.stringify(result));

            // TODO: Get threads info
            db.findMany(Thread, {subforumName: subfName}, "threadTitle username datePosted body", function(result){
                let threads = JSON.parse(JSON.stringify(result));
                res.render('subforumView', {user: user, subforum: subforum, threads: threads});
            })

            if (!subforum)
                ; // TODO: Send to error 404 page
            });
    },

    postUpdateSubforum: function(req, res) {
        // TODO: Update Subforum details
    },

    postDeleteSubforum: function(req, res) {
        // TODO: Delete Subforum
    },

    getCreateThread: function (req, res) {
        // TODO: Render page to create a new thread
        // To get the subforum name: req.params.subfName
        var user = req.session.username; 
        var subfName = req.params.subfName;

        db.findOne(Subforum, {subforumName: subfName}, "subforumName title description", function (result) {
            let subforum = JSON.parse(JSON.stringify(result));

            if (!subforum)
                ; // TODO: Send to error 404 page
            else
                res.render('createThread', {user: user, subforum: subforum});
        });

    },

    postCreateThread: function(req, res){
        console.log("Thread Title: "+req.body.title);
        console.log("Body: "+req.body.bodyContent);
        console.log("Subforum Name: "+req.params.subfName);


        var user = req.session.username; 
        var subfName = req.params.subfName;
        var threadTitle = req.body.title;
        var threadContent = req.body.bodyContent;
       
        let query = {
            subforumName: subfName,
            threadTitle: threadTitle,
            username: user,
            datePosted: new Date(Date.now()).toISOString(),
            body: threadContent
        };

        db.insertOne(Thread, query, function(result){
            let parsedResult = JSON.parse(JSON.stringify(result)); 
            var threadId = parsedResult._id
            console.log(threadId);
            db.updateOne(Subforum, {subforumName: subfName}, {$push:{"threads": threadId}}, function(result){
                res.redirect('/subf/'+subfName+ '/'+threadId); //threadTitle is temporary change to threadID
            });
        })
        
    },

    getThread: function(req, res) {
        /* TODO: Replace sample data below with real ones from db */
        var user = req.session.username; 
        var subfName = req.params.subfName;
        var threadId = req.params.threadId;
        
        var data = {
            user: user,
            thread: null,
            subforum: null,
            replies: [
                {
                    threadID: 1,
                    postedBy: "alpha123",
                    datePosted: "May 17, 2022",
                    body: "Wow. This is very informative. Thank you."
                } // temp, replace with null
            ]
        };

        db.findOne(Subforum, {subforumName: subfName}, "subforumName title description", function (result) {
            data.subforum = JSON.parse(JSON.stringify(result));
            db.findOne(Thread, {_id: mongoose.Types.ObjectId(threadId)}, "threadTitle username datePosted body", function(result){
                data.thread = JSON.parse(JSON.stringify(result));
                res.render('threadView', data);
            })

            if (!data.thread || !data.subforum)
                ; // TODO: Send to error 404 page
        });
        console.log(data);
    }

};

module.exports = forumController;