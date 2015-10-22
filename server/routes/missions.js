var express = require('express');
var jwtauth = require('../controllers/jwtauth');
var User = require('../models/user');
var Mission = require('../models/mission');

var router = express.Router();

module.exports = function () {
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
        
    router.put('/missions', jwtauth, function (req, res) {
        console.log('Bulk update missions');
        res.end();
    });
    
    router.delete('/missions', jwtauth, function (req, res) {
        console.log('Delete all missions');
        res.end();
    });
    
    router.post('/missions/:id', jwtauth, function (req, res) {
        console.log('Get all missions from owner');
        Mission.find({ 'owner' : req.params.id }, function (err, missions) {
            if (err) {
                return res.sendStatus(500);
            }
            
            return res.json({
                'missions': missions,
                method: 'POST',
                success : true
            });
        });
    });
    
    router.get('/missions/:id', jwtauth, function (req, res) {
        console.log('Get mission from id');
        Mission.findOne({ _id : req.params.id }, function (err, mission) {
            if (err) {
                return res.sendStatus(500);
            }
            
            return res.json({
                'missions': mission,
                method: 'GET',
                success : true
            });
        });
    });
    
    
    router.put('/missions/:id', jwtauth, function (req, res) {
        console.log('Update mission: ' + req.params.id);
        res.end();
    });
    
    router.delete('/missions/:id', jwtauth, function (req, res) {
        console.log('Delete mission: ' + req.params.id);
        res.end();
    });
    
    return router;
}