var path = require('path');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(express.static("./app/client"));

module.exports = function(app) {
	// Route server
	app.use('/server/orders', require('./server/orders'));
	app.use('/server/menus', require('./server/menus'));

	// Route client
	// Re-route to same page to fix broken link when refresh
	app.get('*', function(req, res) {
  res.sendFile(__dirname + '/client/index.html')
	});
};
