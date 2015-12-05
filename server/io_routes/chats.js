var User = require('../models/user');
var Mission = require('../models/mission');
var Chat = require('../models/chat');
var Message = require('../models/message');
var default_strings = require('../models/default_strings');

module.exports = function (io, socket) {
    socket.on('send-message', function (data) {
        console.log('new message');
        
        var message = new Message(data);
        message.save(function (err) {
            if (err) { throw (err); }
            
            Chat.find({ '_id': data._id }).populate('_sponsor').populate('_agent').exec(function (err, chat) {
                if (err) { throw (err) }
                
                if (chat) {
                    if (chat._sponsor._id == socker.user._id) {
                        io.sockets[chat._agent.socket].emit('new-message', data);
                    }
                    else if (chat._agent._id == socket.user._id) {
                        io.sockets[chat._agent].emit('new-message', data);
                    }
                }
            });
        });
    });
    
    socket.on('new-chat', function (data) {
        console.log('new chat');
        
        var chat = new Chat({
            '_sponsor' : data.mission._owner,
            '_agent' : socket.user._id,
            '_mission' : data.mission
        });
        
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
                
                User.findOne({ _id : data.mission._owner }, function (err, user) {
                    if (err) { throw (err); }
                    
                    io.to(socket.user._id).emit('new-chat', chat);
                    io.to(user.socket).emit('new-chat', chat);
                });                
            });
        });
    });
    
    socket.on('delete-message', function (data) {

    });
}