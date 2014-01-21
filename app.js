var server = require('http').createServer(handler);
var io = require('socket.io').listen(server);
var fs = require('fs');

server.listen(3000);

if (typeof(PhusionPassenger) == 'undefined') {
	console.log('Socket.io demo listening on http://0.0.0.0:' + server.address().port);
}

function handler(req, res) {
	fs.readFile(__dirname + '/index.html', function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		} else {
			res.writeHead(200);
			res.end(data);
		}
	});
}

io.sockets.on('connection', function (socket) {
	setInterval(function() {
		socket.emit('news', { time: new Date() + '' });
	}, 1000);
});
