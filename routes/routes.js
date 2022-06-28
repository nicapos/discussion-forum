const express = require('express');
const controller = require(`../controllers/controller.js`);
const app = express();

app.get('/', function (req, res) {
    res.render('index');
});
app.get('/login', function (req, res) {
    res.render('login');
});
app.get(`/register`, function(req, res){
    res.render('signup');
});
app.get('/addUser', controller.addUser);
app.get('/checkUsername', controller.checkUsername);
app.get('/logout', function (req, res) {
    res.render('logout');
});


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
app.get('/subf/:subfName/:threadId', function (req, res) {
    res.render('threadView');
    console.log(req.params.subfName);
    console.log(req.params.threadId);
});

app.get('/home', function (req, res) {
    res.render('home');
});
app.get('/search', function (req, res) {
    res.render('search');
});

module.exports = app;
