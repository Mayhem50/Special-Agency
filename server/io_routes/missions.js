var User = require('../models/user');
var Mission = require('../models/mission');
var Kind = require('../models/mission-type');
var Chat = require('../models/chat');

module.exports = function (io, socket) {
    socket.on('add-mission', function (data) {
        console.log('add mission');
        
        var mission = new Mission(data);
        mission._owner = socket.user._id;
        
        Kind.findOne({ '_id' : data._type._id }, function (err, kind) {
            if (err) {
                console.log('Error unknown type: ' + err);
                throw err;
            }
            
            mission._type = kind;
            kind.count++;
            kind.save();
        });
        
        var chat = new Chat({ _sponsor : socket.user, _mission: mission._id });
        chat.save(function (err) {
            if (err) { throw (err); }
        });
        
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
        
        Mission.findOneAndUpdate({ '_id' : data._id }, data, { upsert: true }, function (err, mission) {
            if (err) { throw err; }
            io.emit('update-mission', data);
        });

    });
    
    socket.on('delete-mission', function (data) {
        console.log('delete mission');
        
        Mission.findOne({ '_id' : data._id }, function (err, mission) {
            if (err) { throw err; }
            
            if (!mission) { throw new Error('Mission not found'); }
            
            Kind.findOne({ '_id' : mission._type }, function (err, kind) {
                if (err) {
                    console.log('Error unknown type: ' + err);
                    throw err;
                }
                kind.count--;
                kind.save();
            });
            
            mission.remove();
            
            io.emit('delete-mission', mission);
        });
    });
}