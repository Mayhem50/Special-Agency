var mongoose = require('mongoose');

module.exports = mongoose.model(
    'Mission', {
        title: String,
        type: String,
        desc: String,
        price: Number,
        commanditor: String,
        rank: Number,
        place : String,
    }
);