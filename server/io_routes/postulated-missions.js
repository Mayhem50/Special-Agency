var Postulated = require('../models/postulated-mission');

module.exports = function (io, socket) {
    socket.on('add-postulated-mission', function (data) {
        console.log('add postulated mission');
        
        Postulated.findOne({ _mission : data._mission, _user : socket.user._id }, function (err, postulated) {
            if (err) { throw (err); }
            if (!postulated) {
                postulated = new Postulated({
                    _user : socket.user._id,
                    _mission : data._mission
                });
                
                postulated.save(function (err) {
                    if (err) { throw (err); }
                    socket.emit('add-postulated-mission', postulated);
                });
            }
        });
    });
    
    socket.on('delete-postulated-mission', function (data) {
        console.log('delete postulated mission');
        
        Postulated.findOne({ '_mission' : data._mission, _user : socket.user._id }, function (err, postulated) {
            if (err) { throw err; }
            postulated.remove(function (err) {
                if (err) { throw (err); }
                
                socket.emit('delete-postulated-mission', postulated);
            });
        });  
    });    
}