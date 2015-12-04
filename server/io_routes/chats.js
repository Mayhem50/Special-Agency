var User = require('../models/user');
var Mission = require('../models/mission');
var Chat = require('../models/chat');
var Message = require('../models/message');

module.exports = function (io, socket) {
    socket.on('send-message', function (data) {
        console.log('new message');
        
        var message = new Message(data);
        message.save(function (err) {
            if (err) { throw (err); }

            Chat.find({ '_mission': data.mission, '_sponsor': data.user }, function (err, chat) {
                if (err) { throw (err) }
                                
                if (!chat) {
                    Chat.find({ '_mission' : data.mission, '_agent': data.user }, function (err, chat) {
                        if (err) { throw (err); }
                        
                        if (chat) {
                            io.sockets[chat._sponsor].emit('new-message', data);
                        }
                    })
                }   
                
                io.sockets[chat._agent].emit('new-message', data);
            });
        });

        
    });
    
    socket.on('new-chat', function (data) {
        console.log('new chat');
        
        var chat = new Chat({
            '_sponsor' : data.mission._owner,
            '_agent' : socket.user,
            '_mission' : data.mission
        });

        chat.save(function (err) {
            if (err) { throw (err); }
            
            io.sockets[data.mission._owner].emit('new-chat', chat);
            io.sockets[socket.user].emit('new-chat', chat);
        });
    });
    
    socket.on('delete-message', function (data) {

    });
}