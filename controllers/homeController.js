const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Subforum = require('../models/SubforumModel.js');
const Thread = require('../models/ThreadModel.js');

const homeController = {
    getHome: function(req, res){
        var user = req.session.username;

        var data = {
            user: user, 
            recents: null
        };

        db.findMany(Thread, {username: req.session.username}, "_id username threadTitle subforumName datePosted body", function(result){
            parsedResult = JSON.parse(JSON.stringify(result));
            data.recents = parsedResult;
            res.render('home',data);
        })

        //TODO render joined subforums
    }
}
module.exports = homeController;