var express = require('express');
var jwt = require('jwt-simple');
var jwtauth = require('../controllers/jwtauth');
var User = require('../models/user');

var router = express.Router();

module.exports = function (passport) {
    router.post('/logout', function (req, res) {
        console.log('logout');
        req.logout();
        res.end();
    });
        
    router.post('/signin', function (req, res, next) {
        console.log('receive signin');
        
        passport.authenticate('signin', function (err, user, info) {
            console.log('signin');
            if (err) { return next(err); }
            
            if (!user) {
                return res.status(403).json({
                    message: "not found"
                });
            }
            
            req.login(user, function (err) {
                if (err) return next(err);
                
                var token = jwt.encode(user, 'xbJ9Phit');
                return res.json({
                    message: "logged in",
                    token: token,
                    success: true
                });
            });
        })(req, res, next)
    });
    
    router.post('/signup', function (req, res, next) {
        console.log('receive signup');
        
        passport.authenticate('signup', function (err, user, info) {
            if (err) { return next(err); }
            
            if (!user) {
                return res.json({
                    message: "user exist"
                });
            }
            
            req.login(user, function (err) {
                if (err) return next(err);
                
                var token = jwt.sign(user, 'xbJ9Phit');
                return res.json({
                    message: "sing up finished",
                    token: token,
                    success: true
                });
            });
        })(req, res, next)
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