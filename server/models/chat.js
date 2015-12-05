var mongoose = require('mongoose');

module.exports = mongoose.model(
    'Chat', {       
        _mission : { type: mongoose.Schema.Types.ObjectId, ref: 'Mission' },
        _agent : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
        _sponsor : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: { type : Date, default: Date.now },
        haveUnread: {type: Boolean, default: true}
    }
);