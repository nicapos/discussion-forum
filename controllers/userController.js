const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');

const userController = {
    checkUsername: function(req, res){
        db.findOne(User, req.query, null, function(result){
            res.send(result);
        }) 
    },

    registerAccount: function(req, res){
        bcrypt.hash(req.body.password, 10, function(err, hash){
            console.log(hash);
            let query = {username: req.body.username, email: req.body.email, password: hash};
            db.insertOne(User, query,function(result){
                res.redirect('/login');
            })
        });
    },

    getLogin: function(req, res){
        if(req.session.username){
            res.redirect('/home');
        }
        else
        {
            res.render('login');
        }
    },

    loginAccount: function(req,res){
        var username = req.body.username;
        var password = req.body.password;
        console.log(username);
        db.findOne(User, {username: username}, null, function(result){
            console.log(result);
            if(result){
                bcrypt.compare(password, result.password, function(err, equal){
                    if(equal){
                        req.session.username = result.username;
                        res.redirect('/home');
                        req.session.save();
                    }

                    else{
                        res.render('login',{error: "Username or password is incorrect"});
                    }
                })
            }
            else{
                res.render('login', {error: "Username not found"});
            }
        })
    },

    logoutAccount: function(req, res)
    {
        req.session.destroy(function(err){
            if(err) throw err;
            res.render('logout');
        });
    }

};

module.exports = userController;