const db = require('../models/db.js');
const Thread = require('../models/ThreadModel.js');
const Reply = require('../models/ReplyModel.js');
const Subforum = require('../models/SubforumModel.js');
const User = require('../models/UserModel.js');

const searchController = {
    getSearch: function(req, res){
        var user = req.session.username;
        db.findMany(Subforum, {}, "title description subforumName", function(result){
            let subforums = JSON.parse(JSON.stringify(result));
            console.log(subforums);
            res.render('search', {user: user, subforums: subforums});
        })
    }
}

module.exports = searchController;
