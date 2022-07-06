const db = require('../models/db.js');
const Thread = require('../models/ThreadModel.js');
const Reply = require('../models/ReplyModel.js');
const Subforum = require('../models/SubforumModel.js');
const User = require('../models/UserModel.js');
const moment = require('moment');

const searchController = {

    getSearchPage: function(req, res){
        var user = req.session.username;
        res.render('search', {user: user});

    },

    postSearchPage: function(req, res){
        var user = req.session.username;
        var subforumsSearchWord = req.body.keyword.trim().toLowerCase().replaceAll(' ','-');
        var threadsSearchWord = req.body.keyword;

        console.log({$regex: threadsSearchWord});
        var data = {
            user: user,
            subforums: null,
            threads: null
        };

        db.findMany(Subforum, {subforumName: {$regex: subforumsSearchWord}}, "title description subforumName", function(result){
            data.subforums = JSON.parse(JSON.stringify(result));
            console.log(result)
            db.findMany(Thread, {threadTitle: {$regex: threadsSearchWord}}, "subforumName threadTitle username datePosted body", function(result){
                data.threads = JSON.parse(JSON.stringify(result));
                data.threads.forEach(element => {
                    element.datePosted = moment(element.datePosted).calendar();  
                });
                res.render('search', data);

            })

        })
        

    }

    

    
}

module.exports = searchController;
