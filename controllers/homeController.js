const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Subforum = require('../models/SubforumModel.js');
const Thread = require('../models/ThreadModel.js');
const moment = require('moment');

const homeController = {
    getHome: function(req, res){
        var user = req.session.username;

        var data = {
            user: user, 
            recents: null,
            subforums: [], //TODO push subforum Title
            subforumTitle: []
        };

        var threads = [];

        db.findMany(Subforum, {members: user}, "title subforumName threads", function(result){
            
            if(result){
                result.forEach(function(gotSubforum){
                    //push subforumName to data.subforums[]
                    data.subforums.push([gotSubforum.subforumName, gotSubforum.title]);
                    gotSubforum.threads.forEach(function(threadId){
                        threads.push(threadId);
                    })
                });                
                db.findMany(Thread, {_id: {$in: threads}}, "_id username threadTitle subforumName datePosted body", function(result){
                    if(result){
                        var parsedResult = JSON.parse(JSON.stringify(result));
                        parsedResult.forEach(element => {
                            element.datePosted = moment(element.datePosted).calendar();  
                        });
                        data.recents = parsedResult;
                        res.render('home',data);
                    }
                    else
                        res.render('error');
                });
            }
            else
                res.render('error');
        })
        
        //TODO render joined subforums
    }
}
module.exports = homeController;