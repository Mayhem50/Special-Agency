var express = require('express');
var Translation = require('../models/translation.js');

var router = express.Router();

module.exports = function () {
    router.get('/translation', function (req, res) {
        console.log('Get translation');
        console.log(req.query.translation);
        
        Translation.find({}, function (err, translations) {
            if (err) { throw err; }
            
            return res.json({
                result: translations,
                method : 'GET',
                success: true,
                route: "translation"
            });
        });
    });
    
    router.get('/translation/:lang/:element', function (req, res) {
        console.log('Get element translation');
        console.log(req.query.translation);
        
        Translation.findOne({lang : req.params.lang, element : req.params.element}, function (err, translation) {
            if (err) { throw err; }
            
            return res.json({
                result: translation,
                method : 'GET',
                success: true,
                route: "translation"
            });
        });
    });
    
    return router;
}