var mongoose = require('mongoose');

module.exports = mongoose.model(
    'Google-ID', {
        id: { type : String, required : true },
        email : { type : String, lowercase : true, required : true },
        name : String,
        token : String,
    }
);