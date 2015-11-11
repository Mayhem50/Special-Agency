var mongoose = require('mongoose');

module.exports = mongoose.model(
    'Chat', {       
        _mission : { type: mongoose.Schema.Types.ObjectId, ref: 'Mission' },
        _agent : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
        _sponsor : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },      
        messages : [{
                date : { type : Date, default: Date.now },
                content : { type: String }
            }],
        date: { type : Date, default: Date.now },
    }
);