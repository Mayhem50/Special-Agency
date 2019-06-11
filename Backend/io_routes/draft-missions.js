var Draft = require('../models/draft-mission');

module.exports = function (io, socket) {
    socket.on('add-draft-mission', function (data) {
        console.log('add draft mission');
        
        Draft.findOne({ _user : socket.user._id, _mission : data._mission }, function (err, draft) {
            if (err) { throw (err); }
            if (!draft) {
                draft = new Draft({
                    _user : socket.user._id,
                    _mission : data._mission
                });

                draft.save(function (err) {
                    if (err) { throw (err); }                    
                    socket.emit('add-draft-mission', data);
                }); 
            }
        }); 
    });
    
    socket.on('delete-draft-mission', function (data) {
        console.log('delete draft mission');
        
        Draft.findOne({ '_mission' : data._mission, _user : socket.user._id }, function (err, mission) {
            if (err) { throw err; }
            mission.remove(function (err) {
                if (err) { throw (err); }
                
                socket.emit('delete-draft-mission', data);
            });
        });  
    });    
}