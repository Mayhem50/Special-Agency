var express = require('express');
var jwt = require('jwt-simple');
var jwtauth = require('../controllers/jwtauth');
var User = require('../models/user');

var router = express.Router();

module.exports = function (passport) {
    router.post('/users', function (req, res, next) {
        console.log('Add users: Sign Up');
        
        passport.authenticate('signup', function (err, user, info) {
            if (err) { return next(err); }
            
            if (!user) {
                return res.sendStatus(500);
            }
            
            req.login(user, function (err) {
                if (err) return next(err);
                
                var token = jwt.encode(user._id, 'xbJ9Phit');
                return res.json({
                    method : 'POST',
                    token: token,
                    success: true
                });
            });
        })(req, res, next);
    });
    
    router.get('/users', jwtauth, function (req, res, next) {
        console.log('Get all users');
        
        next();
    });

    router.put('/users', jwtauth, function (req, res, next) {
        console.log('Update all users');
        
        res.end();
    });
    
    router.delete('/users', jwtauth, function (req, res, next) {
        console.log('Delete all users');
        
        res.end();
    });
    
    router.post('/users/:action', function (req, res, next) {
        console.log('Get user : Login');
        
        if (req.params.action == 'login') {
            passport.authenticate('signin', function (err, user, info) {
                console.log('login');
                if (err) { return next(err); }
                
                if (!user) {
                    return res.sendStatus(403);
                }
                
                req.login(user, function (err) {
                    if (err) return next(err);
                    
                    var token = jwt.encode(user._id, 'xbJ9Phit');
                    return res.json( {
                        method : 'POST',
                        token: token,
                        id: user._id,
                        success: true
                    });
                });
            })(req, res, next);
        }
        else if (req.params.action == 'google-auth') {
            passport.authenticate('google', {
                scope: ['profile', 'email']
            }),
             function (req, res) { }
        }
        
        else if (req.params.action == 'google-callback') {
            passport.authenticate('google', function (err, user, info) {
                if (err) return next(err);
                
                if (!user) { return res.sendStatus(403); }
                
                User.findOne({ 'email' : user._json.email }, function (err, usr) {
                    return res.json({
                        method: 'GET',
                        token: usr.token,
                        success: true
                    });
                });
            });
        }

        else if (req.params.action == 'logout') {
            console.log('logout');
            req.logout();
            res.end();
        }
        else{
            next();
        }
    });
    
    router.get('/users/:id', jwtauth, function (req, res, next) {
        console.log('Get user');
                        
        if (req.params.id) {
            User.findOne({ '_id' : req.params.id }, function (err, user){
                if (err) { return next(err); }

                if (!user) { return res.sendStatus(500); }

                return res.json(user);
            })
        }
        else {
            next();
        }
    });

    router.put('/users/:id', jwtauth, function (req, res, next) {
        console.log('Update user');
        
        next();
    });

    router.delete('/users/:id', jwtauth, function (req, res, next) {
        console.log('Delete user');
        
        next();
    });
    
    return router;
}