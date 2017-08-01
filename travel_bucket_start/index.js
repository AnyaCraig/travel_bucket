// this is like the main hub of our back end code

// we bring in Express here, which has been downloaded
// with node package manager and is in our package.json
var express = require('express');

// we initialize our express app
var app = express();

// we need webpack to bundle our code
var webpack = require('webpack');

// this middleware automates the build process
var webpackMiddleware = require('webpack-dev-middleware');

// we need mongoose to communicate with mongodb
var mongoose = require('mongoose');

// this connects you to your database
mongoose.connect('mongodb://localhost/DATABASE_NAME');

// middleware that parses the req body
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Serve bundle.js using webpack
app.use(webpackMiddleware(webpack(require('./webpack.config.js'))));

// this is where we serve our static content like images and stuff
app.use(express.static('public'));

// when something requests this url, serve them the destinations folder
// this will default to an index.js file since the file name
// is not specified
app.use('/api/destinations', require('./api/destinations'));

// If none of the above matches, serve public/index.html
app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'))

// here, we run our app on a local port
app.listen(8080);
