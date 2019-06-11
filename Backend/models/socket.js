var mongoose = require('mongoose');

module.exports = mongoose.model(
    'Socket', {
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        socket: String
    }
);