const db = require('../models/db.js');
const Thread = require('../models/ThreadModel.js');
const Reply = require('../models/ReplyModel.js');
const Subforum = require('../models/SubforumModel.js');
const User = require('../models/UserModel.js');

const forumController = {

    getAddSubforum: function (req, res) {
        res.render('createSubforum');
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

        // TODO: Add subf creator as member

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
        // TODO: Read Subforum
        // To get the subforum name: req.params.subfName
        res.render('subforumView');
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
        res.render('createThread');
    },


    getThread: function(req, res) {
        /* TODO: Replace sample data below with real ones from db */
        data = {
            thread: {
                threadID: 1,
                subforumID: "copypastas",
                threadTitle: "how to use the operator",
                postedBy: "charlie123",
                datePosted: "May 17, 2022",
                body: "I'm not sure why folks say it's simple to op. It's obvious that timing the click to shoot with the op while holding an angle is difficult...",
                likes: 0
            }, // temp, replace with null
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

        var subfName = req.params.subfName;
        var threadId = req.params.threadId;
        
        db.findOne(Subforum, {subforumName: subfName}, "subforumName title description", function (result) {
            data.subforum = JSON.parse(JSON.stringify(result));
            res.render('threadView', data);

            // TODO: Get thread info

            if (!data.thread || !data.subforum)
                ; // TODO: Send to error 404 page
        });
        console.log(data);
    }

};

module.exports = forumController;