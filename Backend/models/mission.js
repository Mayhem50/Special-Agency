var mongoose = require('mongoose');

var User = require('../models/user');
var Mission = require('../models/mission');
var Kind = require('../models/kind');

var Mission = mongoose.Schema({
    _sponsor : { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate : true },
    _type : { type: mongoose.Schema.Types.ObjectId, ref: 'Kind', autopopulate : true },
    _subType : { type: mongoose.Schema.Types.ObjectId, ref: 'Kind', autopopulate : true },
    _agent : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    level : Number,
    reward : Number,
    descritpion : String,
    shortDescritpion : String,
    status : { type : String, default : 'free', required : true }, // 0. Free, 1. Accepted, 2. Ended, 3. Favorite, 10. Draft 
    creationDate : { type : Date, default: Date.now },
    wishDates : [{
            date : String,
            laps: [{type : Boolean}]
        }],
    finishDate : Date,
    proOnly: { type: Boolean, default: false, required: true },
    place : {
        longitude : Number,
        latitude : Number,
        address : String
    },
    rank : Number,
    photos : [String],
    tasks: [{
            order: Number,
            description: String,
            comment: String
        }]
});

Mission.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model(
    'Mission', Mission
);