var User = require('../models/user');
var Mission = require('../models/mission');
var Kind = require('../models/mission-type');
var Chat = require('../models/chat');
var Message = require('../models/message');
var Socket = require('../models/socket');
var default_strings = require('../models/default_strings');

module.exports = function (io, socket) {
    socket.on('send-message', function (data) {
        //data = {
        //    sender : UserID,
        //    receiver: UserID,
        //    mission: Mission,
        //    message: String,
        //    chat: ChatID
        //}     
        
        console.log('new message');
        Chat.findOne({ '_mission': data.mission._id, '_sponsor' : data.mission._owner, '_agent' : { $in : [data.receiver, data.sender._id] } }, function (err, chat) {
            if (err) { throw (err); }
            
            if (!chat) {
                chat = new Chat({
                    _mission : data.mission,
                    _sponsor: data.mission._owner,
                    _agent: data.sender._id,
                    _messages: [],
                    unreads: 1
                });
                var message = new Message({
                    message : data.message,
                    _sender: data.sender._id,
                    _receiver: data.receiver,
                    _chat : chat._id
                });
                
                chat._messages.push(message._id);
                
                chat.save(function (err) {
                    if (err) { throw (err); }
                    
                    
                    
                    message.save(function (err) {
                        if (err) { throw (err); }                        
                        
                        User.populate(chat, { path: '_agent _sponsor' }, function (err, chat) {
                            Message.populate(chat, { path: '_messages' }, function (err, chat) {
                                Mission.populate(chat, { path: '_mission' }, function (err, chat) {
                                    Kind.populate(chat._mission, { path: '_type' }, function (err, mission) {
                                        Socket.findOne({ '_user' : data.receiver._id }, function (err, sock) {
                                            if (sock)
                                                io.to(sock.socket).emit('new-chat', chat);

                                            socket.emit('new-chat', chat);
                                        });
                                    });
                                });
                            });
                        });
                    });
                        
                });
            }
            else {
                var message = new Message({
                    message : data.message,
                    _sender: data.sender._id,
                    _receiver: data.receiver,
                    _chat : chat._id
                });
                
                message.save(function (err) {
                    if (err) { throw (err); }
                    chat._messages.push(message._id);
                    ++chat.unreads;
                    
                    chat.save(function (err) {
                        if (err) { throw (err) };
                        
                        Socket.findOne({ '_user' : data.receiver }, function (err, sock) {
                            if(sock)
                                io.to(sock.socket).emit('new-message', message);

                            socket.emit('new-message', message);
                        });
                    });
                });
            }
        });
    });
    
    socket.on('chat-read', function (data) {
        Chat.findOneAndUpdate({ '_id' : data._id }, data, { upsert: true }).populate('_messages').exec(function (err, chat) {
            if (err) { throw (err); }
            console.log('chat updated');

            chat._messages.forEach(function (element) {
                Message.findOneAndUpdate({
                    '_id': element._id
                }, { 'isRead' : true }, { upsert : true }, function (err, message) {
                    if (err) { throw (err); }
                    console.log(message.message + ': ' + 'updated');
                })
            });

            socket.emit('chat-read', chat);
        });
    });
}