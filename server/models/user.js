var mongoose = require('mongoose');

module.exports = mongoose.model(
    'User', {
        email : { type : String, lowercase : true, required : true },
        firstName : String,
        lastName : String,
        gender : String,
        address : {
            number : String,
            street : String,
            state : String,
            zip : String
        },
        agentID : String,
        avatar : String,
        password : String,
        rank: Number,
        birthDate : Date,
        missionsDone : Number,
        googleID: { type: mongoose.Schema.Types.ObjectId, ref: 'Google-ID' }
    }
);
