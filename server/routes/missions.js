var express = require('express');
var jwtauth = require('../controllers/jwtauth');
var User = require('../models/user');
var Mission = require('../models/mission');

var router = express.Router();

module.exports = function (passport) {
    router.post('/missions', jwtauth, function (req, res) {
        console.log('Create a mission'); 
        res.sendStatus(200);
    });
    
    router.get('/missions', function (req, res) {
        console.log('Get all missions');
        res.end();
    });    
    
    router.put('/missions', function (req, res) {
        console.log('Bulk update missions');
        res.end();
    });
    
    router.delete('/missions', function (req, res) {
        console.log('Delete all dogs');
        res.end();
    });
    
    router.post('/missions/:id', function (req, res) {
        console.log('Error ');
        res.end();
    });
    
    router.get('/missions/:id', function (req, res) {
        console.log('Show mission: ' + req.params.id);
        res.end();
    });
    
    
    router.put('/missions/:id', function (req, res) {
        console.log('Update mission: ' + req.params.id);
        res.end();
    });
    
    router.delete('/missions/:id', function (req, res) {
        console.log('Delete mission: ' + req.params.id);
        res.end();
    });
    
    return router;
}