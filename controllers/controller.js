const db = require('../models/db.js');

const controller = {
    getFavicon: function (req, res) {
        res.status(204);
    },
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
        res.render('logout');
    }
};

module.exports = controller;
