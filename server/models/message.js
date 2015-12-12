var mongoose = require('mongoose');

module.exports = mongoose.model(
    'Message', {
        _chat : { type: mongoose.Schema.Types.ObjectId, required : true, ref: 'Chat' },
        _sender: { type: mongoose.Schema.Types.ObjectId, required : true, ref: 'User' },
        _receiver: { type: mongoose.Schema.Types.ObjectId, required : true, ref: 'User' },
        date : { type : Date, default: Date.now },
        message : { type: String },
        isRead: { type: Boolean, default: false }
    }
);