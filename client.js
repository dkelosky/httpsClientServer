#!/usr/bin/env node

var fs = require('fs'),
    https = require('https');

// We pass our client key & cert to the http agent,
// which we then use to make the request.
var agentOptions = {
	key: fs.readFileSync('client.key'),
	cert: fs.readFileSync('client.crt'),
};
var agent = new https.Agent(agentOptions)

var requestOptions = {
	host: 'localhost',
	port: 8000,
	path: '/',
	method: 'GET',
	agent: agent,
	ca: fs.readFileSync('ca.crt') // Because we've self-signed our server cert
	                              // we need an authority chain for it.
};

var req = https.request(requestOptions, function (res)
{
	console.log('got a response');
	res.pipe(process.stdout);
});
req.end();

req.on('error', function (err)
{
	console.error(err);
});