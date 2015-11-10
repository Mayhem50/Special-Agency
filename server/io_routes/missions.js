var UserDB = require('../models/user');
var MissionDB = require('../models/mission');
var KindDB = require('../models/mission-type');

module.exports = function (io, socket) {    
    socket.on('add-mission', function (data) {
        console.log('add mission');
        
        var mission = new MissionDB(data);
        mission._owner = socket.user;
        
        KindDB.findOne({ '_id' : data._type }, function (err, kind) { 
            if (err) {
                console.log('Error unknown type: ' + err);
                throw err;
            }

            mission._type = kind._id;
            kind.count++;
            kind.save();
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
        
        MissionDB.findOneAndUpdate({ '_id' : data._id }, data, { upsert: true }, function (err, mission) {
            if (err) { throw err; }
            io.emit('update-mission', data);
        });

    });
    
    socket.on('delete-mission', function (data) {
        console.log('delete mission');
        
        MissionDB.findOne({ '_id' : data._id }, function (err, mission) {
            if (err) { throw err; }
            
            if (!mission) { throw new Error('Mission not found'); }

            KindDB.findOne({ '_id' : mission._type }, function (err, kind) {
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