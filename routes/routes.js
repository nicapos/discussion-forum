const express = require('express');

const controller = require(`../controllers/controller.js`);
const userController = require(`../controllers/userController.js`);
const forumController = require(`../controllers/forumController.js`);
const homeController = require('../controllers/homeController.js');
const app = express();

app.get('/', controller.getIndex);
app.get('/login', userController.getLogin);
app.post('/login', userController.loginAccount);

app.get('/register', controller.getSignup);
app.post('/register', userController.registerAccount);

app.get('/logout', userController.logoutAccount);

app.get('/checkUsername', userController.checkUsername);

app.get('/user/:username', function (req, res) {
    res.render('profile');
    console.log(req.params.username);
});
app.get('/user/:username/edit', function (req, res) {
    res.render('editProfile');
    console.log(req.params.username);
});
app.get('/settings', function (req, res) {
    res.render('editAccount');
});
app.get('/delete', function (req, res) {
    res.render('deleteAccount');
});


app.get('/subf/new', function (req, res) {
    res.render('createSubforum');
});
app.get('/subf/:subfName', function (req, res) {
    res.render('subforumView');
    console.log(req.params.subfName);
});
app.get('/subf/:subfName/new', function (req, res) {
    res.render('createThread');
    console.log(req.params.subfName);
});
app.get('/subf/:subfId/:threadId', forumController.getThread);

app.get('/home', homeController.getHome);
app.get('/search', function (req, res) {
    res.render('search');
});

module.exports = app;
