const db = require('../models/db.js');
const Thread = require('../models/ThreadModel.js');
const Reply = require('../models/ReplyModel.js');
const Subforum = require('../models/SubforumModel.js');

const forumController = {


    getThread: function(req, res) {
        // To access subforum id: req.params.subfId;
        // To access thread id: req.params.threadId;
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
            },
            subforum: {
                subforumName: "copypastas",   
                title: "Copypastas",          
                description: "Share your favorite copypastas.",
            },
            replies: [
                {
                    threadID: 1,
                    postedBy: "alpha123",
                    datePosted: "May 17, 2022",
                    body: "Wow. This is very informative. Thank you."
                }
            ]
        };

        res.render('threadView', data);
    }

};

module.exports = forumController;