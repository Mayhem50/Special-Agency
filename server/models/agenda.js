var mongoose = require('mongoose');

var Agenda = mongoose.Schema({
    _user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' , autopopulate : true },

});

module.exports = mongoose.model(
    'Chat', Chat
);