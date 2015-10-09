﻿var signin = require('./passport-login');
var signup = require('./passport-signup');
var User = require('../../models/user');

module.exports = function (passport) {
    
    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    
    // Setting up Passport Strategies for Login and SignUp/Registration
    signin(passport);
    signup(passport);
}