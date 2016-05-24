var io = require("socket.io")();
var socketioJwt = require('socketio-jwt');
var jwauthSocket = require('../controllers/jwtauth-socket');
var Socket = require('../models/socket');

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

        Socket.findOneAndUpdate({ '_user' : socket.user._id }, { 'socket' : socket.id }, { upsert: true }, function (err, sock) {
            if (err) { throw err; }            
            socket.emit('connect', 'socket update');
        });
        
        var io_missions = require('../io_routes/missions')(io, socket);
        var io_chats = require('../io_routes/chats')(io, socket);
        var io_draft_missions = require('../io_routes/draft-missions')(io, socket);
        var io_favorite_missions = require('../io_routes/favorite-missions')(io, socket);
        var io_favorite_missions = require('../io_routes/postulated-missions')(io, socket);
    });

    io.sockets.on('deconnection', function (socket) {
        console.log('User leave: ' + socket.id);
        
        Socket.findOneAndRemove({ '_user' : socket.user._id }, function (err, sock) {
            if (err) { throw err; }
        });      
    });
}
