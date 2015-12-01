var express = require('express');
var jwtauth = require('../controllers/jwtauth');
var Kind = require('../models/./mission-type.js');
var Mission = require('../models/./mission.js');

var router = express.Router();

module.exports = function () {
    router.post('/kinds', jwtauth, function (req, res) {
        console.log('Create a kind');
        console.log(req.query.kind);
        
        var kind = new Kind(req.body.kind);
        
        kind.name.en = kind.name.en.replace(/^./, kind.name.en[0].toUpperCase());
        kind.name.fr = kind.name.fr.replace(/^./, kind.name.fr[0].toUpperCase());
        
        kind.save(function (err) {
            if (err) {
                console.log('Error in Saving mission: ' + err);
                throw err;
            }
        });
        
        res.json({
            method : 'POST',
            success: true,
            route: "kinds"
        });
    });
    
    router.get('/kinds', function (req, res) {
        console.log('Get all kinds');
        Kind.find({"isTop": "true"}, function (err, kinds) {
            if (err) { throw err; }
                              
            return res.json({
                result: kinds,
                method: 'GET',
                success : true,
                route: "kinds"
            });
        });
    });
    
    router.put('/kinds', jwtauth, function (req, res) {
        console.log('Bulk update kinds');
        res.end();
    });
    
    router.delete('/kinds', jwtauth, function (req, res) {
        console.log('Delete all kinds');
        res.end();
    });    
    
    return router;
}