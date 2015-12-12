var express = require('express');
var jwtauth = require('../controllers/jwtauth');
var User = require('../models/user');
var Type = require('../models/mission-type');
var Mission = require('../models/mission');

var router = express.Router();

module.exports = function () {
    router.post('/missions', jwtauth, function (req, res) {
        console.log('Create a mission');
        console.log(req.query.mission);
        
        var mission = new Mission(req.body.mission);
        mission._owner = req.user._id;
        
        Type.findOne({ '_id' : mission._type }, function (err, Type) {
            if (err) { throw err; }
            
            Type.count = Type.count + 1;
            Type.save();
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
        console.log('Get all missions not finished');
        Mission.find({}).populate('_type _subType _owner').exec(function (err, missions) {
            if (err) { return res.sendStatus(500); }
                        
            return res.json({
                result: missions,
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
    
    router.post('/missions/:mode', jwtauth, function (req, res) {
        console.log('Get all missions from owner');
        
        if (req.params.mode == 'agent') {
            Mission.find( {'_owner' :{"$ne" : req.user._id } }, function (err, missions) {
                if (err) {
                    return res.sendStatus(500);
                }
                
                return res.json({
                    result: missions,
                    method: 'POST',
                    success : true,
                    route: "missions"
                });
            });
        }
        if (req.params.mode == 'sponsor') {
            Mission.find({ '_owner' : req.user._id }, function (err, missions) {
                if (err) {
                    return res.sendStatus(500);
                }
                
                return res.json({
                    result: missions,
                    method: 'POST',
                    success : true,
                    route: "missions"
                });
            });
        }
        
        res.end();                
    });
    
    router.get('/missions/:mode', jwtauth, function (req, res) {
        console.log('Get all missions from owner');
        
        if (req.params.mode == 'agent') {
            Mission.find({ '_owner' : { "$ne" : req.user._id } }, function (err, missions) {
                if (err) {
                    return res.sendStatus(500);
                }
                
                return res.json({
                    result: missions,
                    method: 'GET',
                    success : true,
                    route: "missions"
                });
            });
        }
        else if (req.params.mode == 'sponsor') {
            Mission.find({ '_owner' : req.user._id }, function (err, missions) {
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
        }
        else if (req.params.mode == 'type') {
            Mission.find({ '_type' : req.Type._id }).populate('_type').populate('_title').exec( function (err, missions) {
                if (err) {
                    return res.sendStatus(500);
                }
                
                return res.json({
                    result: missions,
                    method: 'GET',
                    success : true,
                    route: "missions"
                });
            });
        }
        else
            res.end(); 
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
                result: mission._id,
                route: "missions"
            });
        })
    });
    
    return router;
}