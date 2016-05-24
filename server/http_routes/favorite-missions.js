var express = require('express');
var jwtauth = require('../controllers/jwtauth');
var Favorite = require('../models/favorite-mission.js');

var router = express.Router();

module.exports = function () {
    router.post('/favorite-missions', jwtauth, function (req, res) {
        console.log('Add a favorite mission');
        console.log(req.query.mission);

        Favorite.findOne({ _mission : data._mission, _user : socket.user._id }, function (err, favorite) {
            if (err) { return res.sendStatus(500); }
            if (!favorite) {
                favorite = new Favorite({
                    _user : socket.user._id,
                    _mission : data._mission
                });
                
                favorite.save(function (err) {
                    if (err) { return res.sendStatus(500); }

                    res.json({
                        method : 'POST',
                        success: true,
                        route: "favorite-missions"
                    });
                });
            }
        });       
    });
    
    router.get('/favorite-missions', jwtauth, function (req, res) {
        console.log('Get all favorite missions');
        Favorite.find({ _user : req.user._id }, function (err, missions) {
            if (err) { return res.sendStatus(500); }
            
            return res.json({
                result: missions,
                method: 'GET',
                success : true,
                route: "favorite-missions"
            });
        });
    });
    
    return router;
}