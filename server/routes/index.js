var express = require('express');

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
    
    /* Handle Login POST */
    router.post('/signin', function (req, res, next) {
        if (!req.body)
            return;
        passport.authenticate('signup', function (err, user, info) {
            if(err){ return next(err);}
            if (!user) {
                return res.status(403).json({
                    message: "not found"
                });
            }
            
            req.login(user, function(err) {
                if (err) return next(err);
                return res.json({
                    message: "logged in",
                });
            });
        })(req, res, next)
    });
    
    ///* GET Registration Page */
    //router.get('/signup', function (req, res) {
    //    res.render('register', { message: req.flash('message') });
    //});
    
    ///* Handle Registration POST */
    
    router.post('/signup', function (req, res, next) {
        passport.authenticate('signup', function (err, user, info) {
            if (err) { return next(err); }
            
            if (!user) {
                return res.json({
                    message: "user exist"
                });
            }
            
            req.login(user, function (err) {
                if (err) return next(err);
                console.log(user);
                return res.json({
                    message: "logged in",
                });
            });
        })(req, res, next)
    });
    
    //router.post('/signup', function (req, res) {
    //    console.log(JSON.stringify(req.body));
    //    console.log('Username', req.body['username']);
    //    console.log('Password', req.body['password']);
    //    console.log('Email', req.body['email']);
    //    res.end();
    //});
    
    ///* GET Home Page */
    //router.get('/home', isAuthenticated, function (req, res) {
    //    res.render('home', { user: req.user });
    //});
    
    ///* Handle Logout */
    //router.get('/signout', function (req, res) {
    //    req.logout();
    //    res.redirect('/');
    //});
    
    return router;
}