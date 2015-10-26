var io = require("socket.io")();

module.exports = function (server) {
	console.log('Start ioSocket');
	return io.attach(server);
}
