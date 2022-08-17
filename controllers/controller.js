const db = require('../models/db.js');

const controller = {
    getIndex: function (req, res) {
        res.render('index');
    },
    getLogin: function (req, res) {
        res.render('login');
    },
    getSignup: function(req, res){
        res.render('signup');
    },
    getLogout: function (req, res) {
        res.render('jjj');
    }
};

module.exports = controller;
