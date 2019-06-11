var express = require('express');
var jwtauth = require('../controllers/jwtauth');
var Kind = require('../models/type');

var router = express.Router();

module.exports = function () {
    router.post('/types', jwtauth, function (req, res) {
        console.log('Create a type');
        console.log(req.query.type);
        
        var type = new Kind(req.body.type);
        
        type.save(function (err) {
            if (err) {
                console.log('Error in Saving type: ' + err);
                throw err;
            }
        });
        
        res.json({
            method : 'POST',
            success: true
        });
    });
    
    router.get('/types', function (req, res) {
        console.log('Get all types');
        type.find({}, function (err, types) {
            if (err) {
                return res.sendStatus(500);
            }
            
            return res.json({
                'types': types,
                method: 'GET',
                success : true
            });
        });
    });
    
    router.put('/types', jwtauth, function (req, res) {
        console.log('Bulk update types');
        res.end();
    });
    
    router.delete('/types', jwtauth, function (req, res) {
        console.log('Delete all types');
        res.end();
    });
    
    router.post('/types/:id', jwtauth, function (req, res) {
        console.log('Get all types from owner');
        type.find({ '_sponsor' : req.params.id }, function (err, types) {
            if (err) {
                return res.sendStatus(500);
            }
            
            return res.json({
                'types': types,
                method: 'POST',
                success : true
            });
        });
    });
    
    router.get('/types/:id', jwtauth, function (req, res) {
        console.log('Get subtypes from id');
        type.find({ _parentKind : req.params.id }, function (err, types) {
            if (err) { return res.sendStatus(500); }
            
            return res.json({
                'types': types,
                method: 'GET',
                success : true
            });
        });
    });
    
    
    router.put('/types/:action', jwtauth, function (req, res) {
        console.log('Update type: ' + req.params.id);
        
        if (req.params.action == 'accept') {
            type.findOneAndUpdate({ '_id' : req.body.type._id }, { '_agent' : req.user._id }, function (err, type) {
                console.log('find types');
                if (err) { return res.sendStatus(500); }
                
                if (!type) { return res.sendStatus(500); }
                
                return res.json({
                    method: 'PUT',
                    success: true,
                });
            });
        }
        else if (req.params.action == 'update') {
            type.findOneAndUpdate({ '_id' : req.body.type._id }, req.body.type, function (err, type) {
                console.log('find types');
                if (err) { return res.sendStatus(500); }
                
                if (!type) { return res.sendStatus(500); }
                
                return res.json({
                    method: 'PUT',
                    success: true,
                });
            });
        }
        else {
            res.end();
        }
    });
    
    router.delete('/type/:id', jwtauth, function (req, res) {
        console.log('Delete type: ' + req.params.id);
        
        type.findOne({ '_id' : req.params.id }, function (err, type) {
            if (err) { return next(err); }
            
            if (!type) { return res.sendStatus(500); }
            
            type.remove();
            
            return res.json({
                success: true,
                method: 'DELETE',
                type: type._id
            });
        })
    });
    
    return router;
}