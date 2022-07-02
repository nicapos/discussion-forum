const db = require('../models/db.js');
const Thread = require('../models/ThreadModel.js');
const Reply = require('../models/ReplyModel.js');
const Subforum = require('../models/SubforumModel.js');
const User = require('../models/UserModel.js');
const mongoose = require('mongoose');

const threadController = {

    getCreateThread: function (req, res) {
        var user = req.session.username; 
        var subfName = req.params.subfName;

        db.findOne(Subforum, {subforumName: subfName}, "subforumName title description", function (result) {
            let subforum = JSON.parse(JSON.stringify(result));

            if (!subforum)
                res.render('error'); // TODO: Send to error 404 page
            else
                res.render('createThread', {user: user, subforum: subforum});
        });

    },

    postCreateThread: function(req, res){
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
            db.updateOne(Subforum, {subforumName: subfName}, {$push:{"threads": result}}, function(result){
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
            
            if(!data.subforum)
                res.render('error');

            else{
                db.findOne(Thread, {_id: mongoose.Types.ObjectId(threadId)}, "threadTitle username datePosted body", function(result){
                    data.thread = JSON.parse(JSON.stringify(result));
                    if(!data.thread)
                        res.render('error');

                    res.render('threadView', data);
                })
            }
        });
        console.log(data);
    },

    postDeleteThread: function(req, res) {
        // TODO: Delete Subforum
    }

};

module.exports = threadController;