var User = require('../models/user');
var Mission = require('../models/mission');
var Kind = require('../models/mission-type');
var Chat = require('../models/chat');
var Message = require('../models/message');
var default_strings = require('../models/default_strings');

module.exports = function (io, socket) {
    socket.on('add-mission', function (data) {
        console.log('add mission');
        
        data.wishDates.sort(function (a, b) {
            var A = new Date(a);
            var B = new Date(b);
            
            return A - B;
        });

        var mission = new Mission(data);
        mission._owner = socket.user;
        
        Kind.findOne({ '_id' : data._type._id }, function (err, kind) {
            if (err) {
                console.log('Error unknown type: ' + err);
                throw err;
            }
            
            mission._type = kind;
            kind.count++;
            kind.save();
            mission.save(function (err) {
                if (err) {
                    console.log('Error in Saving mission: ' + err);
                    throw err;
                }
                io.emit('add-mission', mission);
            });            
        });
        
            //socket.broadcast.emit('add-mission', mission);
    });
    
    socket.on('update-mission', function (data) {
        console.log('update mission');
        
        Mission.findOneAndUpdate({ '_id' : data._id }, data, { upsert: true }, function (err, mission) {
            if (err) { throw err; }
            io.emit('update-mission', data);
        });        
    });
    
    socket.on('accept-mission', function (data) {
        console.log('accept mission');        
        
    });  
    
    socket.on('postulate-mission', function (data) {
        console.log('postulate mission');
        
        var chat = new Chat({ _sponsor : data.mission._owner, _mission: data.mission._id, _agent : socket.user._id });
        chat.save(function (err) {
            if (err) { throw (err); }
            
            var message;
            if (data.lang == 'fr') {
                message = new Message({ _chat: chat._id, content : default_strings.fr.default_message });
            }
            else if (data.lang == 'en') {
                message = new Message({ _chat: chat._id, content : default_strings.en.default_message });
            }
            
            message.save(function (err) {
                if (err) { throw (err); }
            });
            data.message = message;
            
            User.findOne({ _id: data._owner }, function (err, user) {
                if (err) { throw (err); }
                if (user) {
                    var socket = io.sockets.sockets[user.socket];
                    if(socket)
                        socket.emit('postulate-mission', data);
                }
            });
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