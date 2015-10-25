var mongoose = require('mongoose');

module.exports = mongoose.model(
    'Mission', {
        title : String,
        type : String,
        subType : String,
        level : { type : Number, min : 0, max : 2 },
        reward : Number,
        descritpion : String,
        _owner : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status : { type : Number, min : 0, max : 2 },
        creationDate : { type : Date, default: Date.now },
        todoDate : { type : Date, default: Date.now },
        finishDate : Date,
        _agent : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
    }
);