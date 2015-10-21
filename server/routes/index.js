var express = require('express');

var router = express.Router();

module.exports = function () {
    
    router.get('/', function (req, res) {
        res.sendFile('index.html');
    });
    
    return router;
}