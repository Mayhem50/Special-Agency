var User = require('../models/user');
var jwt = require('jwt-simple');

module.exports = function (socket, next) {
    var token = (socket.handshake.query && socket.handshake.query.token) || socket.handshake.headers['x-access-token'];
    
    if (token) {

        var id = jwt.decode(token, 'xbJ9Phit');

        return User.findOne({ _id : id }, function (err, user) {
            if (err) {
                socket.err = new Error('Authentication Socket error');
                return next(socket.err);
            }

            if (!user) {
                socket.err = new Error('Authentication DB error');
                return next(socket.err);
            }
            
            socket.user = user;
            return next();
        });
    }
    
    socket.err = new Error('Token error');
    return next(socket.err);
};
