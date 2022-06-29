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
    var user = req.session.username; 
    res.render('profile', {user: user});
    // To access username in URL: req.params.username
});
app.get('/user/:username/edit', function (req, res) {
    var user = req.session.username;
    res.render('editProfile', {user: user});
    // To access username in URL: req.params.username
});
app.get('/settings', function (req, res) {
    var user = req.session.username;
    res.render('editAccount', {user: user});
});
app.get('/delete', function (req, res) {
    res.render('deleteAccount');
});


app.get('/subf/new', forumController.getAddSubforum);
app.post('/new/subf', forumController.postAddSubforum);

app.get('/subf/:subfName', forumController.getSubforum);
app.get('/subf/:subfName/join', ); // TODO: Join subforum
app.get('/subf/:subfName/new', forumController.getCreateThread);
app.post('/new/thread', ); // TODO: Create new thread

app.get('/subf/:subfName/:threadId', forumController.getThread);

app.get('/home', homeController.getHome);
app.get('/search', function (req, res) {
    var user = req.session.username;
    res.render('search', {user: user});
});

module.exports = app;
