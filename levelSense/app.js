var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var opn = require('opn');
var app = express();

// Routing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./app/client")));
require("./app/route")(app);

console.log("Starting the application...");

// Connecting to server on port 80
var server = app.listen(80, function () {
	console.log("Connected to the server");
});

// Connecting to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://foodmenu:0123456789@ds157624.mlab.com:57624/foodmenu');
mongoose.connection.on('error', console.error.bind(console, 'Connection error:'));
mongoose.connection.once('open', function () {
	console.log("Connected to the database");
	//console.log("Opening application in Google Chrome");
	//opn("http://levelSense.sg", { app: ["chrome"] });
});
