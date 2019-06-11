var express = require('express');
var jwtauth = require('../controllers/jwtauth');
var Draft = require('../models/draft-mission.js');

var router = express.Router();

module.exports = function () {
    router.post('/draft-missions', jwtauth, function (req, res) {
        console.log('Add a draft mission');
        console.log(req.query.mission);
        
        Draft.findOne({ _user : socket.user._id, _mission : data._mission }, function (err, draft) {
            if (err) { return res.sendStatus(500); }
            if (!draft) {
                draft = new Draft({
                    _user : socket.user._id,
                    _mission : data._mission
                });
                
                draft.save(function (err) {
                    if (err) { return res.sendStatus(500); }
                    res.json({
                        result: draft, 
                        method : 'POST',
                        success: true,
                        route: "draft-missions"
                    });
                });
            }
        });     
    });
    
    router.get('/draft-missions', jwtauth,  function (req, res) {
        console.log('Get all draft missions');
        Draft.find({ _user : req.user._id }, function (err, missions) {
            if (err) { return res.sendStatus(500); }
            
            return res.json({
                result: missions,
                method: 'GET',
                success : true,
                route: "draft-missions"
            });
        });
    });
    
    return router;
}