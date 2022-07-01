const express = require('express');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const controller = require(`../controllers/controller.js`);
const userController = require(`../controllers/userController.js`);
const forumController = require(`../controllers/forumController.js`);
const homeController = require('../controllers/homeController.js');
const profileController = require('../controllers/profileController.js');
const settingsController = require('../controllers/settingsController.js');
const imageController = require('../controllers/imageController.js');

const app = express();

app.get('/', controller.getIndex);
app.get('/login', userController.getLogin);
app.post('/login', userController.loginAccount);

app.get('/register', controller.getSignup);
app.post('/register', userController.registerAccount);

app.get('/logout', userController.logoutAccount);

app.get('/checkUsername', userController.checkUsername);

app.get('/user/:username', profileController.getProfile);
app.get('/user/:username/edit', profileController.getEditProfile);
app.post('/user/:username/edit', profileController.postEditProfile);

app.get('/settings', settingsController.getSettings);
app.get('/changeUsername', settingsController.getChangeUsername);
app.post('/changeUsername', settingsController.postChangeUsername);
app.get('/changePassword', settingsController.getChangePassword);
app.post('/changePassword', settingsController.postChangePassword);
app.get('/delete', function (req, res) {
    res.render('deleteAccount');
});

app.post('/uploadImg', upload.single('edit_profile_photo'), imageController.postUpload);
app.get('/images/:name', imageController.getImage);


app.get('/subf/new', forumController.getAddSubforum);
app.post('/new/subf', forumController.postAddSubforum);
app.get('/checkSubforum', forumController.checkSubforum);

app.get('/subf/:subfName', forumController.getSubforum);
app.get('/subf/:subfName/join', ); // TODO: Join subforum
app.get('/subf/:subfName/new/thread', forumController.getCreateThread);
app.post('/subf/:subfName/new/thread', forumController.postCreateThread); // TODO: Create new thread

app.get('/subf/:subfName/:threadTitle', forumController.getThread);

app.get('/home', homeController.getHome);
app.get('/search', function (req, res) {
    var user = req.session.username;
    res.render('search', {user: user});
});

module.exports = app;
