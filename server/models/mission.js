var mongoose = require('mongoose');

module.exports = mongoose.model(
    'Mission', {
        _owner : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        _agent : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        _type : { type: mongoose.Schema.Types.ObjectId, ref: 'Mission-Type' },
        _subType : { type: mongoose.Schema.Types.ObjectId, ref: 'Mission-Type' },
        title: String,
        level : Number,
        reward : Number,
        descritpion : String,
        shortDescritpion : String,
        status : { type : Number, min : 0, max : 10 },
        creationDate : { type : Date, default: Date.now },
        wishDates : [{ type : String }],
        finishDate : Date,
        proOnly: {type: Boolean, default: false, required: true},
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
    }
);