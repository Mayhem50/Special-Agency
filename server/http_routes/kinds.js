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
                'kinds': kinds,
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