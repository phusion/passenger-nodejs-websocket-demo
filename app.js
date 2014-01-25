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
	return __dirname + '/public' + name;
}

/**
 * The handler function for the HTTP server. It just serves static files.
 *
 * Note that this entire handler function does not get called when the demo app
 * is run under Phusion Passenger. This is because Phusion Passenger takes care
 * of serving all static assets through a real web server (Nginx or Apache).
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
		socket.emit('news', { message: new Date() + '' });
	}, 1000);

	socket.on('message', function(data) {
		socket.emit('news', { message: "The server received your message: \"" + data + "\"" });
	});
});
