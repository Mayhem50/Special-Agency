var io = require("socket.io")();
var socketioJwt = require('socketio-jwt');
var jwauthSocket = require('../controllers/jwtauth-socket');
var User = require('../models/user');

module.exports = function (server) {
    console.log('Start ioSocket');
    
    io.attach(server);
    
    io.use(socketioJwt.authorize({
        secret: 'xbJ9Phit',
        handshake: true
    }));
    
    io.use(jwauthSocket);

    io.sockets.on('connection', function (socket) {
        console.log('Granted user: ' + socket.id);        

        User.findOneAndUpdate({ '_id' : socket.user }, { 'socket' : socket.id }, { upsert: true }, function (err, user) {
            if (err) { throw err; }
        });

        socket.on('connect', function (data) {
            console.log(data);
            socket.emit('connect', 'hello world');            
        });
        
        var io_missions = require('../io_routes/missions')(io, socket);
        var io_chats = require('../io_routes/chats')(io, socket);
    });
}
