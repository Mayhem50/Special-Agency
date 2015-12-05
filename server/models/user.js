var mongoose = require('mongoose');

module.exports = mongoose.model(
    'User', {
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
        rank: Number,
        birthDate : Date,
        missionsDone : Number,
        socket: String
    }
);
