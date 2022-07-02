const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Subforum = require('../models/SubforumModel.js');
const Thread = require('../models/ThreadModel.js');

const homeController = {
    getHome: function(req, res){
        var user = req.session.username;

        var data = {
            user: user, 
            recents: null,
            subforums: [] //TODO push subforum Title
        };

        var threads = [];

        db.findMany(Subforum, {members: user}, "subforumName threads", function(result){
            //push each threadId to threads
            result.forEach(function(subfThreads){
                    data.subforums.push(subfThreads.subforumName);
                subfThreads.threads.forEach(function(threadId){
                    threads.push(threadId);
                })
            });
            console.log(data.subforums);
            
            db.findMany(Thread, {_id: {$in: threads}}, "_id username threadTitle subforumName datePosted body", function(result){
                parsedResult = JSON.parse(JSON.stringify(result));
                data.recents = parsedResult;
                res.render('home',data);
            });
    
        })
        
        //TODO render joined subforums
    }
}
module.exports = homeController;