const dotenv = require('dotenv');
const express = require(`express`);
const { default: mongoose } = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const routes = require(`./routes/routes.js`);
const db = require(`./models/db.js`);
const { options } = require('./routes/routes.js');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.use(session({
    'secret': 'ccapdev-discussiq',
    'resave': false,
    'saveUninitialized': false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL })
}));

app.use(express.static('public'));
app.use('/', routes);

app.use(function (req, res) {

    var details = {};

    /*
        checks if a user is logged-in by checking the session data
        if a user is logged-in,
        display the profile tab and logout tab in the nav bar.
    */
    if(req.session.username) {
        details.flag = true;
        details.username = req.session.username;
    }

    /*
        if no user is logged-in,
        do not display the profile tab and the logout tab in the nav bar.
    */
    else
        details.flag = false;

    // render `../views/error.hbs`
    res.render('error');
});

db.connect();

app.listen(port, hostname, function () {
    console.log('Server is running at:');
    console.log('http://' + hostname + ':' + port);
});
