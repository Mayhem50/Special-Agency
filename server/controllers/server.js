#!/usr/bin/env node

var debug = require('debug')('Special_Agency');
var http = require('http');
var fs = require('fs');

module.exports = function(app){ 
	var sslOptions = {
		key: fs.readFileSync('keys/server.key'),
		cert: fs.readFileSync('keys/server.crt'),
		ca: fs.readFileSync('keys/ca.crt'),
		requestCert: true,
		rejectUnauthorized: false
	};

	app.set('port', process.env.PORT || 3000);

	return server = http.createServer(app).listen(app.get('port'), function() {
		debug('Express server listening on port ' + server.address().port);
	});
}
