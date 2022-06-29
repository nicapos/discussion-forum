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
                        res.redirect('/success');
                    }

                    else{
                        var details = {
                            flag: false,
                            error: 'Username or Password is incorrect'
                        };
                        res.render('login',{error: "Username or password is incorrect"});
                    }
                })
            }
            else{
                var details = {
                    flag: false,
                };
                res.render('login', {error: "Username not found"});
            }
        })
    }

};

module.exports = userController;