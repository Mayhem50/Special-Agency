var express = require('express');
var jwtauth = require('../controllers/jwtauth');
var Postulated = require('../models/postulated-mission.js');

var router = express.Router();

module.exports = function () {
    router.post('/postulated-missions', jwtauth, function (req, res) {
        console.log('Add a postulated mission');
        console.log(req.query.mission);
        
        var postulated = new Postulated({
            _user : req.user._id,
            _mission : req.query.mission._id
        });
        
        postulated.save(function (err) {
            if (err) { return res.sendStatus(500); }
            res.json({
                method : 'POST',
                success: true,
                route: "postulated-missions"
            });
        });        
    });
    
    router.get('/postulated-missions', jwtauth, function (req, res) {
        console.log('Get all postulated missions');
        Postulated.find({ _user : req.user._id }, function (err, missions) {
            if (err) { return res.sendStatus(500); }
            
            return res.json({
                result: missions,
                method: 'GET',
                success : true,
                route: "postulated-missions"
            });
        });
    });
    
    return router;
}