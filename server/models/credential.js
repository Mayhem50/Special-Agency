var mongoose = require('mongoose');

module.exports = mongoose.model(
    'Credential', {
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true },
        email : { type : String, lowercase : true, required : true },
        password : { type : String, required : true }
    }
);