var mongoose = require('mongoose');

var User = mongoose.Schema({
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
    birthDate : Date
});

module.exports = mongoose.model(
    'User', User
);
