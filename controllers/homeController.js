const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Subforum = require('../models/SubforumModel.js');
const Thread = require('../models/ThreadModel.js');

const homeController = {
    getHome: function(req, res){
        db.findMany(Thread, {username: req.session.username}, {threadID: 0, likes: 0}, function(result){
            console.log(result);
            res.render('home',{recents: result});
        })
    }
}
module.exports = homeController;