var express = require('express');
var User = require('../models/user');

var router = express.Router();

module.exports = function () {
    
    router.post('/checkAvailability/:type', function (req, res) {
        console.log('usernameAvailability');
        
        User.findOne({ 'email' : req.query.email }, function (err, user) {
            if (err) {
                return next(err);
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
    
    return router;
}