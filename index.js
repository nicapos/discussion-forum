const dotenv = require('dotenv');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
// const db = require(`./models/db.js`); TODO

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.use(express.static('public'));
app.use('/', routes);

//db.connect(); TODO

app.listen(port, hostname, function () {
    console.log('Server is running at:');
    console.log('http://' + hostname + ':' + port);
});
