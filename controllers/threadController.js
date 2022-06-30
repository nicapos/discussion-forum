const db = require('../models/db.js');
const Thread = require('../models/ThreadModel.js');
const Reply = require('../models/ReplyModel.js');
const Subforum = require('../models/SubforumModel.js');
const User = require('../models/UserModel.js');

const threadController = {

    getCreateThread: function (req, res) {
        var user = req.session.username; 
        res.render('createThread', {user: user});
    },

    postCreateThread: function(req,res) {
        var user = req.session.username;
        var title = req.body.title;
        var post = req.body.threadpost;
        var date = req.body.date;

        var query = {
            threadID: threadID,
            subforumID: subforumID,
            title: title,
            user: user,
            post: post,
            replies: []
        };

        db.insertOne(Thread, query, function(flag) {
            // TODO: post
        });
    },

    getThread: function(req, res) {
        /* TODO: Replace sample data below with real ones from db */
        var user = req.session.username; 
        var subfName = req.params.subfName;
        var threadId = req.params.threadId;

        var data = {
            user: user,
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

        db.findOne(Subforum, {subforumName: subfName}, "subforumName title description", function (result) {
            data.subforum = JSON.parse(JSON.stringify(result));
            res.render('threadView', data);

            // TODO: Get thread info

            if (!data.thread || !data.subforum)
                ; // TODO: Send to error 404 page
            else   
                res.render();
        });
        console.log(data);
    },

    postDeleteThread: function(req, res) {
        // TODO: Delete Subforum
    }

};

module.exports = threadController;