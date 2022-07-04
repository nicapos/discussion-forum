const db = require('../models/db.js');
const Thread = require('../models/ThreadModel.js');
const Reply = require('../models/ReplyModel.js');
const Subforum = require('../models/SubforumModel.js');
const User = require('../models/UserModel.js');

const searchController = {

    getSearchPage: function(req, res){
        var user = req.session.username;
        res.render('search', {user: user});

    },

    postSearchPage: function(req, res){
        var user = req.session.username;
        var searchWord = req.body.keyword;
        console.log(searchWord);
        var data = {
            user: user,
            subforums: null,
            threads: null
        };

        db.findMany(Subforum, {subforumName: {$regex: searchWord}}, "title description subforumName", function(result){
            data.subforums = JSON.parse(JSON.stringify(result));
            console.log(result)
            db.findMany(Thread, {threadTitle: {$regex: searchWord}}, "subforumName threadTitle username datePosted body", function(result){
                data.threads = JSON.parse(JSON.stringify(result));
                res.render('search', data);

            })

        })
        

    }

    

    
}

module.exports = searchController;
