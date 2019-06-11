var LocalStrategy = require('passport-local').Strategy;
var Credential = require('../../models/credential');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {
    
    passport.use('signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    },
        function (req, username, password, done) {
        // check in mongo if a user with username exists or not
        Credential.findOne({ 'email' : username }).populate('_user').exec(function (err, credential) {
            // In case of any error, return using the done method
            if (err)
                return done(err);
            // Username does not exist, log the error and redirect back
            if (!credential) {
                console.log('User Not Found with username ' + username);
                //return done(null, false, req.flash('message', 'User Not found.'));
                return done(null, false, req.flash('message', 'User Not found.'));
            }
            // User exists but wrong password, log the error 
            if (!isValidPassword(credential, password)) {
                console.log('Invalid Password');
                return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
            }
            // User and password both match, return user from done method
            // which will be treated like success
            return done(null, credential._user);
        });
    }));    
    
    var isValidPassword = function (credential, password) {
        return bCrypt.compareSync(password, credential.password);
    }    
}