#!/usr/bin/env node

var fs = require('fs'),
    https = require('https');

var options = {
	key: fs.readFileSync('server.key'),
	cert: fs.readFileSync('server.crt'),
	ca: fs.readFileSync('ca.crt'), // authority chain for the clients
	requestCert: true, // ask for a client cert
	rejectUnauthorized: false, // act on unauthorized clients at the app level
};

var server = https.createServer(options, function(req, res) {
	console.log('responding to request')
	res.end('welcome!\n');
})

server.on('connection', function(c)
{
	console.log('insecure connection')
});

server.on('secureConnection', function (c)
{
	// c.authorized will be true if the client cert presented validates with our CA
	console.log('secure connection; client authorized: ', c.authorized);
});

server.listen(8000, function() {
	console.log('server listening on port 8000');
});