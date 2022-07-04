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
            likes: 0,
            body: threadContent
        };

        db.insertOne(Thread, query, function(result){
            let parsedResult = JSON.parse(JSON.stringify(result)); 
            var threadId = parsedResult._id
            console.log(threadId);
            db.updateOne(Subforum, {subforumName: subfName}, {$push:{"threads": result}}, function(result){
                res.redirect('/subf/'+subfName+ '/'+threadId);
            });
        })
        
    },

    getThread: function(req, res) {
        var user = req.session.username; 
        var subfName = req.params.subfName;
        var threadId = req.params.threadId;
        var isUserMember = false;

        var data = {
            user: user,
            thread: null,
            subforum: null,
            replies: null,
            isOwnThread: null
        };
        db.findOne(Subforum, {subforumName: subfName}, "subforumName title description members", function (result) {
            data.subforum = JSON.parse(JSON.stringify(result));
            isUserMember = data.subforum.members.includes(user);
            if(!data.subforum)
                res.render('error');

            else{
                db.findOne(Thread, {_id: mongoose.Types.ObjectId(threadId)}, "_id subforumName threadTitle username datePosted body replies likes likedBy dislikedBy", function(result){
                    var parsedThread = JSON.parse(JSON.stringify(result));
                    
                    parsedThread.isOwnThread = user == parsedThread.username;
                    parsedThread.isUserMember = isUserMember;
                    parsedThread.isOwnThread = user == parsedThread.username;
                    parsedThread.isLiked = parsedThread.likedBy.includes(user);
                    parsedThread.isDisliked = parsedThread.dislikedBy.includes(user);

                    data.thread = parsedThread;

                    if(!data.thread)
                        res.render('error');

                    else{
                        db.findMany(Reply, {_id: result.replies}, "", function(result){
                            var toParse = JSON.parse(JSON.stringify(result));
                            toParse.forEach(function(currObj, index){
                                currObj.ownReply = user == currObj.username;
                            })
                            data.replies = toParse;

                            if(!data.replies)
                                res.render('error');
                            else
                                res.render('threadView', data);
                        });
                    }
                })
            }
        });
    },

    postThreadReply: function(req, res){
        var user = req.session.username;
        var threadId = req.params.threadId;
        var body = req.body.reply;
        var subfName = req.params.subfName;

        let query = {
            threadId: threadId,
            username: user,
            datePosted: new Date(Date.now()).toISOString(),
            body: body
        };

        db.insertOne(Reply, query, function(result){
            if(!result){
                res.render('error');
            }
            else{
                db.updateOne(Thread, {_id: threadId}, {$push:{"replies":result._id}},function(result){
                    if(!result)
                        res.render('error');
                    else
                        res.redirect('/subf/'+subfName+'/'+threadId);
                })
            }
        })
    },

    getDeleteThread: function(req, res) {
        var threadId = req.params.threadId;
        var subfName = req.params.subfName;
        db.deleteOne(Thread, {_id: threadId}, function(result){
            if(result){
                db.deleteMany(Reply, {threadId: threadId}, function(result){
                    if(result)
                        res.redirect("/subf/"+subfName);
                    else
                        res.render('error');
                })
            }
        })
    },

    getDeleteReply: function(req, res){
        var threadId = req.params.threadId;
        var replyId = req.params.replyId;

        db.deleteOne(Reply,{_id: replyId},function(result){
            if(result){
                db.updateOne(Thread, {_id: threadId}, {$pull:{"replies":replyId}}, function(result){
                    if(result)
                        res.redirect('back');
                })
            }
            else
                res.render('error');
        })
    },

    postLike: function(req, res) {
        var threadId = req.body.threadId;
        var username = req.session.username;

        db.findOne(Thread, {_id: threadId}, "likes", function (result) {
            var data = JSON.parse(JSON.stringify(result)); 
            if (result) {
                let likes = data.likes + 1;
                db.updateOne(Thread, {_id: threadId}, {$set:{"likes": likes}, $push:{"likedBy":username}}, function(result2) {
                    if (result2)
                        console.log(username+" liked thread (id: "+threadId+")");
                });

            }
        });

        /*
            redirect to error page when trying to load page `/action/like`
            postLike should be done asynchronously
        */
        res.redirect('error');
    },

    postDislike: function(req, res) {
        var threadId = req.body.threadId;
        var username = req.session.username;

        db.findOne(Thread, {_id: threadId}, "likes", function (result) {
            var data = JSON.parse(JSON.stringify(result)); 
            if (result) {
                let likes = data.likes - 1;
                db.updateOne(Thread, {_id: threadId}, {$set:{"likes": likes}, $push:{"dislikedBy":username}}, function(result2) {
                    if (result2)
                        console.log(username+" disliked thread (id: "+threadId+")");
                });
            }
        });

        /*
            redirect to error page when trying to load page `/action/dislike`
            postLike should be done asynchronously
        */
        res.redirect('error');
    },

    postRemoveLike: function(req, res) {
        var threadId = req.body.threadId;
        var username = req.session.username;

        db.findOne(Thread, {_id: threadId}, "likes", function (result) {
            var data = JSON.parse(JSON.stringify(result)); 
            if (result) {
                let likes = data.likes - 1;
                db.updateOne(Thread, {_id: threadId}, {$set:{"likes": likes}, $pull:{"likedBy":username}}, function(result2) {
                    if (result2)
                        console.log(username+" removed like from thread (id: "+threadId+")");
                });

            }
        });

        /*
            redirect to error page when trying to load page `/action/removeLike`
            postLike should be done asynchronously
        */
        res.redirect('error');
    },

    postRemoveDislike: function(req, res) {
        var threadId = req.body.threadId;
        var username = req.session.username;

        db.findOne(Thread, {_id: threadId}, "likes", function (result) {
            var data = JSON.parse(JSON.stringify(result)); 
            if (result) {
                let likes = data.likes + 1;
                db.updateOne(Thread, {_id: threadId}, {$set:{"likes": likes}, $pull:{"dislikedBy":username}}, function(result2) {
                    if (result2)
                        console.log(username+" removed dislike from thread (id: "+threadId+")");
                });
            }
        });

        /*
            redirect to error page when trying to load page `/action/removeDislike`
            postLike should be done asynchronously
        */
        res.redirect('error');
    }
};

module.exports = threadController;