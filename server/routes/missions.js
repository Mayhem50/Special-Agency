var express = require('express');
var jwtauth = require('../controllers/jwtauth');
var User = require('../models/user');
var Mission = require('../models/mission');

var router = express.Router();

module.exports = function (passport) {
    router.post('/missions', jwtauth, function (req, res) {
        console.log('Create a mission');
        
        var mission = new Mission({
            title : req.query.title,
            type : req.query.type,
            subType : '',
            level : req.query.level,
            reward : req.query.reward,
            descritpion : req.query.description,
            owner : req.user._id,
            status : 0
        });
        
        mission.save(function (err) {
            if (err) {
                console.log('Error in Saving mission: ' + err);
                throw err;
            }
        });

        res.json({
            method : 'POST',
            success: true
        });
    });
    
    router.get('/missions', jwtauth, function (req, res) {
        console.log('Get all missions');
        Mission.find({}, function (err, missions) {
            if (err) {
                return res.sendStatus(500);
            }

            return res.json({
                'missions': missions,
                method: 'GET',
                success : true
            });
        });
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