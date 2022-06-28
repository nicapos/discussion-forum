const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const userController = {
    checkUsername: function(req, res){
        db.findOne(User, req.query, null, function(result){
            res.send(result);
        }) 
    },

    registerAccount: function(req, res){
        let query = {username: req.body.username, email: req.body.email, password: req.body.password}
        db.insertOne(User, query,function(result){
        })
        res.redirect('/login');
    }

};

module.exports = userController;