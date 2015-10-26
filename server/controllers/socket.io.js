var io = require("socket.io")();
var socketioJwt = require('socketio-jwt');
var UserDB = require('../models/user');
var MissionDB = require('../models/mission');
var jwauthSocket = require('../controllers/jwtauth-socket');

module.exports = function (server) {
	console.log('Start ioSocket');

	io.attach(server);

	io.use(socketioJwt.authorize({
		secret: 'xbJ9Phit',
		handshake: true
	}));

	io.use(jwauthSocket);

    io.sockets.on('connection', function (socket) {
        console.log('Granted user');
        socket.on('connect', function (data) {
            console.log(data);
            socket.emit('connect', 'hello world');
        });

        socket.on('add-mission', function (data) {
            console.log('add mission');
            
            var mission = new MissionDB(data);
            mission._owner = socket.user;
            
            mission.save(function (err) {
                if (err) {
                    console.log('Error in Saving mission: ' + err);
                    throw err;
                }
            });

            io.emit('add-mission', mission);
            //socket.broadcast.emit('add-mission', mission);
        });
        
        socket.on('update-mission', function (data) {
            console.log('update mission');

            MissionDB.findOneAndUpdate({ '_id' : data._id }, data, { upsert: true }, function (err, mission) {
                if (err) { throw err; }
                io.emit('update-mission', data);
            });

        });
        
        socket.on('delete-mission', function (data) {
            console.log('delete mission');

            MissionDB.findOne({ '_id' : data._id }, function (err, mission) {
                if (err) { throw err ; }
                
                if (!mission) { throw new Error('Mission not found'); }
                
                mission.remove();      
                
                io.emit('delete-mission', mission);
            });
        });
	});
}
