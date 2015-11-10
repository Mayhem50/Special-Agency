var express = require('express');
var jwtauth = require('../controllers/jwtauth');
var User = require('../models/user');
var Mission = require('../models/mission');
var Kind = require('../models/mission-type');

var router = express.Router();

module.exports = function () {
    router.post('/missions', jwtauth, function (req, res) {
        console.log('Create a mission');
        console.log(req.query.mission);
        
        var mission = new Mission(req.body.mission);
        mission._owner = req.user._id;
        
        Kind.findOne({ '_id' : mission._type }, function (err, kind) {
            if (err) { throw err; }
            
            kind.count = kind.count + 1;
            kind.save();
        });
        
        mission.save(function (err) {
            if (err) {
                console.log('Error in Saving mission: ' + err);
                throw err;
            }
        });

        res.json({
            method : 'POST',
            success: true,
            route: "missions"
        });
    });
    
    router.get('/missions', function (req, res) {
        console.log('Get all missions');
        Mission.find({}).populate('_owner').populate('_agent').exec(function (err, missions) {
            if (err) {
                return res.sendStatus(500);
            }
            
            return res.json({
                'missions': missions,
                method: 'GET',
                success : true,
                route: "missions"
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
        Mission.find({ '_owner' : req.params.id }, function (err, missions) {
            if (err) {
                return res.sendStatus(500);
            }
            
            return res.json({
                'missions': missions,
                method: 'POST',
                success : true,
                route: "missions"
            });
        });
    });
    
    router.get('/missions/:id', jwtauth, function (req, res) {
        console.log('Get mission from id');
        Mission.findOne({ _id : req.params.id }, function (err, mission) {
            if (err) { return res.sendStatus(500); }
            
            return res.json({
                'missions': mission,
                method: 'GET',
                success : true,
                route: "missions"
            });
        });
    });
    
    
    router.put('/missions/:action', jwtauth, function (req, res) {
        console.log('Update mission: ' + req.params.id);
        
        if (req.params.action == 'accept') {
            Mission.findOneAndUpdate({ '_id' : req.body.mission._id }, { '_agent' : req.user._id }, function (err, mission) {
                console.log('find missions');
                if (err) { return res.sendStatus(500); }
                
                if (!mission) { return res.sendStatus(500); }

                return res.json({
                    method: 'PUT',
                    success: true,
                    route: "missions"
                });
            });
        }
        else if (req.params.action == 'update') {
            Mission.findOneAndUpdate({ '_id' : req.body.mission._id }, req.body.mission, function (err, mission) {
                console.log('find missions');
                if (err) { return res.sendStatus(500); }
                
                if (!mission) { return res.sendStatus(500); }
                
                return res.json( {
                    method: 'PUT',
                    success: true,
                    route: "missions"
                });
            });
        }
        else{
            res.end();
        }
    });
    
    router.delete('/missions/:id', jwtauth, function (req, res) {
        console.log('Delete mission: ' + req.params.id);
        
        Mission.findOne({ '_id' : req.params.id }, function (err, mission){
            if (err) { return next(err); }

            if (!mission) { return res.sendStatus(500); }

            mission.remove();

            return res.json({
                success: true,
                method: 'DELETE',
                mission: mission._id,
                route: "missions"
            });
        })
    });
    
    return router;
}