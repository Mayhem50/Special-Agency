var User = require('../models/user');
var Mission = require('../models/mission');
var Kind = require('../models/kind');
var Chat = require('../models/chat');
var Socket = require('../models/socket');
var default_strings = require('../models/default_strings');

module.exports = function (io, socket) {
    socket.on('new-message', function (data) {
        if (!data.chat) {
            console.log('new chat');
            
            var chat = new Chat({
                _mission : data.mission,
                _sponsor: data.mission._sponsor,
                _agent: data._sender,
                messages: [{
                        _sender: socket.user._id,
                        _receiver : data.mission._sponsor._id,
                        message : data.message,
                        date: Date.now(),
                        tag: data.tag ? data.tag : null
                    }],
                sponsorUnreads: 1
            });
            
            chat.save(function (err) {
                if (err) { throw (err); }
                
                User.populate(chat, { path : '_agent _sponsor' }, function (err, chat) {
                    if (err) { throw (err); }
                    Mission.populate(chat, { path : '_mission' }, function (err, chat) {
                        if (err) { throw (err); }
                        Kind.populate(chat._mission, { path : '_type' }, function (err, mission) {
                            if (err) { throw (err); }
                            
                            Socket.findOne({ _user : data._receiver._id }, function (err, _socket) {
                                if (err) { throw (err); }
                                if (_socket) {
                                    io.to(_socket.socket).emit('new-chat', chat);
                                }
                                socket.emit('new-chat', chat);
                            });
                        });
                    });
                });
            });
        }
        else {
            Chat.findOne({ _id : data.chat }, function (err, chat) {
                if (err) { throw (err); }
                if (chat) {
                    
                    var res = {
                        message : {
                            _sender: socket.user._id,
                            _receiver : data._receiver,
                            message : data.message,
                            date: Date.now(),
                            tag: data.tag ? data.tag : null
                        },
                        chat : chat
                    };
                    chat.messages.push(res.message);
                    
                    if (socket.user.id == chat._sponsor._id) {
                        ++chat.agentUnreads;
                    }
                    else {
                        ++chat.sponsorUnreads;
                    }

                    chat.save(function (err) {
                        if (err) { throw (err); }

                        Socket.findOne({ _user : data._receiver }, function (err, _socket) {
                            if (err) { throw (err); }
                            if (_socket) {
                                io.to(_socket.socket).emit('new-message', res);
                            }
                            socket.emit('new-message', res);
                        });
                    });
                }
            });
        }
    });
        
    socket.on('read-chat', function (data) {
        if (data == null) { return; }
        
        Chat.findOne({ '_id' : data._id }, function (err, chat) {
            if (err) { throw (err); }
            console.log('chat read');
            
            if (chat) {
                if (socket.user._id.equals(chat._sponsor._id)) {
                    chat.sponsorUnreads = 0;
                }
                else {
                    chat.agentUnreads = 0;
                }

                chat.save();                
                socket.emit('read-chat', chat);
            }          
        });
    });
}