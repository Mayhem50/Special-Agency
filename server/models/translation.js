var mongoose = require('mongoose');

module.exports = mongoose.model(
    'Translation', {
        lang: String,
        element: String,
        texts : Object 
    }
);