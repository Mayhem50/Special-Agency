var express = require('express');
var jwtauth = require('../controllers/jwtauth');
var User = require('../models/user');

var router = express.Router();

module.exports = function () {
    router.post('/checkAvailability/:type', function (req, res) {
        console.log('usernameAvailability');
        
        User.findOne({ 'email' : req.query.email }, function (err, user) {
            if (err) {
                throw(err);
            }
            
            if (user) {
                return res.json({
                    message: "used",
                    isFree: false
                });
            }
            else {
                return res.json({
                    message: "free",
                    isFree: true
                });
            }
        });
    });
    
    router.post('/token', jwtauth, function (req, res) {
        console.log('token');
        
        if (req.user)
            res.sendStatus(200);
        else
            res.sendStatus(403);
    }); 
    
    return router;
}