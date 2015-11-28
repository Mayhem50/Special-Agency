var mongoose = require('mongoose');

module.exports = mongoose.model(
    'Mission', {
        _title : { type: mongoose.Schema.Types.ObjectId, ref: 'Mission-Type' },
        _type : { type: mongoose.Schema.Types.ObjectId, ref: 'Mission-Type' },
        _owner : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        _agent : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        level : Number,
        reward : Number,
        descritpion : String,
        status : { type : Number, min : 0, max : 10 },
        creationDate : { type : Date, default: Date.now },
        wishDates : [{ type : String }],
        finishDate : Date,
        proOnly: {type: Boolean, default: false, required: true},
        where : {
            longitude : String,
            latitude : String,
            address : {
                number : String,
                street : String,
                state : String,
                zip : String
            }
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