var mongoose = require('mongoose');

var User = require('../models/user');
var Mission = require('../models/mission');
var Kind = require('../models/kind');

var Chat = mongoose.Schema({
    _mission : { type: mongoose.Schema.Types.ObjectId, ref: 'Mission' , autopopulate : true},
    _agent : { type: mongoose.Schema.Types.ObjectId, ref: 'User' , autopopulate : true}, 
    _sponsor : { type: mongoose.Schema.Types.ObjectId, ref: 'User' , autopopulate : true},
    messages : [
        {
            _sender: { type: mongoose.Schema.Types.ObjectId, required : true, ref: 'User' },
            _receiver: { type: mongoose.Schema.Types.ObjectId, required : true, ref: 'User' },
            date : { type : Date, default: Date.now, required : true },
            message : { type: String },
            tag: {type: String}
        }
    ],
    date: { type : Date, default: Date.now },
    sponsorUnreads: { type: Number, default : 0, required : true },
    agentUnreads: { type: Number, default : 0, required : true}
});

Chat.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model(
    'Chat', Chat
);