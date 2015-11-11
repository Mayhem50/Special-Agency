var User = require('../models/user');
var Mission = require('../models/mission');
var Chat = require('../models/chat');

module.exports = function (io, socket) {
    socket.on('add-message', function (data) {
        console.log('add message');
        
        Chat.find({ '_mission': data.mission, 'sponsor': data.user }, function (err, chat) {
            if (err) { throw (err) }

            var message = { 'content' : data.message, 'date': Date.now() };

            if (!chat) {
                Chat.find({ '_mission' : data.mission, '_agent': data.user }, function (err, chat) {
                    if (err) { throw (err); }

                    if (chat) {
                        chat.message.push(message);
                        chat.save();
                        io.sockets[chat._sponsor].emit('add-message', message);
                    }
                })
            }
        });
    });
    
    socket.on('new-chat', function (data) {
        console.log('new chat');
        
        var chat = new Chat({
            '_sponsor' : data.mission._owner,
            '_agent' : socket.user
        });

        chat.save(function (err) {
            if (err) { throw (err); }

        });

        io.sockets[data.mission._owner].emit('new-chat', chat);
        io.sockets[socket.user].emit('new-chat', chat);
    });
    
    socket.on('delete-message', function (data) {

    });
}