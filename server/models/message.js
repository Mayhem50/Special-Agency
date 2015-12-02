var mongoose = require('mongoose');

module.exports = mongoose.model(
    'Message', {
        _chat : { type: mongoose.Schema.Types.ObjectId, required : true, ref: 'Chat' },
        date : { type : Date, default: Date.now },
        content : { type: String },
        read: { type: Boolean, default: false }
    }
);