const db = require('../models/db.js');
const Thread = require('../models/ThreadModel.js');
const Subforum = require('../models/SubforumModel.js');
const User = require('../models/UserModel.js');

const controller = {
    addUser: function(req, res){
        db.insertOne(User, req.query, function(result){
        })
    },

    checkUsername: function(req, res){
        db.findOne(User, req.query, null, function(result){
            res.send(result);
        }) 
    }
    
}
module.exports = controller;
