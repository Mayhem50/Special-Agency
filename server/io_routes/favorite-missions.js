var Favorite = require('../models/favorite-mission');

module.exports = function (io, socket) {
    socket.on('add-favorite-mission', function (data) {
        console.log('add favorite mission');
        
        Favorite.findOne({ _mission : data._mission, _user : socket.user._id }, function (err, favorite) {
            if (err) { throw (err); }
            if (!favorite) {
                favorite = new Favorite({
                    _user : socket.user._id,
                    _mission : data._mission
                });
                
                favorite.save(function (err) {
                    if (err) { throw (err); }
                    socket.emit('add-favorite-mission', favorite);
                });
            }
        });   
    });
    
    socket.on('delete-favorite-mission', function (data) {
        console.log('delete favorite mission');
        
        Favorite.findOne({ '_mission' : data._mission, _user : socket.user._id }, function (err, mission) {
            if (err) { throw err; }
            mission.remove(function (err) {
                if (err) { throw (err); }
                
                socket.emit('delete-favorite-mission', mission);
            });
        });  
    });    
}