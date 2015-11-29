﻿var mongoose = require('mongoose');

var Type = mongoose.Schema({
    name: {
        en : { type: String, lowercase : true, required : true },
        fr : { type: String, lowercase : true },
    },
    image: {
        path : String,
        xOffset: String,
        yOffset: String,
        scale: String,
        toolBarXOffset: String,
        toolBarYOffset: String,
        toolbarScale: String
    },
    color: String,
    css: String,
    isTop: Boolean,
    size: Number,
    count: Number,
    _parentType: { type: mongoose.Schema.ObjectId, ref: 'Mission-Type' },
});

module.exports = mongoose.model(
    'Mission-Type', Type
);