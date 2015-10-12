var express = require('express');
var jwt = require('jwt-simple');

var router = express.Router();

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

module.exports = function (passport) {
    
    /* GET login page. */
    router.get('/', function (req, res) {
        res.sendFile('index.html');
    });
    
    router.post('/logout', function (req, res) {
        console.log('logout');
        req.logout();
        res.sendFile('index.html');
    });
    
    /* Handle Login POST */
    router.post('/signin', function (req, res, next) {
        console.log('receive signin');
        console.log(req);

        if (!req.body)
            return;

        passport.authenticate('signin', function (err, user, info) {
        console.log('signin');
            if (err) { return next(err); }

            if (!user) {
                return res.status(403).json({
                    message: "not found"
                });
            }
            
            req.login(user, function(err) {
                if (err) return next(err);
                
                var token = jwt.encode(user, 'xbJ9Phit');
                return res.json({
                    message: "logged in",
                    token: token,
                    isAuthenticated: true
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

                var token = jwt.encode(user, 'xbJ9Phit');
                return res.json({
                    message: "sing up finished",
                    token: token,
                    isAuthenticated: true
                });
            });
        })(req, res, next)
    });
    
    return router;
}