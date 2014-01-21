var server = require('http').createServer(handler);
var io = require('socket.io').listen(server);
var fs = require('fs');

server.listen(3000);

if (typeof(PhusionPassenger) == 'undefined') {
	console.log('Socket.io demo listening on http://0.0.0.0:' + server.address().port);
}

/**
 * Given a request, looks up the static file that belongs to it.
 *
 * This function is not written with security in mind. It was
 * written quickly for this demo. Do not use this function's code
 * in production.
 */
function lookupFile(req) {
	var name;
	if (req.url == '/') {
		name = '/index.html';
	} else {
		name = req.url;
	}
	try {
		fs.statSync(__dirname + name);
		return __dirname + name;
	} catch (ex) {
		try {
			fs.statSync(__dirname + '/public' + name);
			return __dirname + '/public' + name;
		} catch (ex) {
			return undefined;
		}
	}
}

/**
 * The handler function for the HTTP server. It just serves static files.
 */
function handler(req, res) {
	var filename = lookupFile(req);
	fs.readFile(filename, function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading file');
		} else {
			res.writeHead(200);
			res.end(data);
		}
	});
}

/**
 * The handler function for Socket.io. For every incoming connection,
 * it sends the current timestamp once a second.
 */
io.sockets.on('connection', function (socket) {
	setInterval(function() {
		socket.emit('news', { time: new Date() + '' });
	}, 1000);
});
