var GoogleStrategy = require('passport-google-oauth2').Strategy;
var User = require('../../models/user');

var GOOGLE_CLIENT_ID = "810350748127-6icpvb3i8f76g3jole1s3d1dhfqr3pa2.apps.googleusercontent.com"
  , GOOGLE_CLIENT_SECRET = "rBzZQNzt8ijyGlVID9H1Hfm5";

module.exports = function (passport) {
    passport.use('google', new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        //NOTE :
        //Carefull ! and avoid usage of Private IP, otherwise you will get the device_id device_name issue for Private IP during authentication
        //The workaround is to set up thru the google cloud console a fully qualified domain name such as http://mydomain:3000/ 
        //then edit your /etc/hosts local file to point on your private IP. 
        //Also both sign-in button + callbackURL has to be share the same url, otherwise two cookies will be created and lead to lost your session
        //if you use it.
        callbackURL: "http://127.0.0.1:3000/users/google-callback",
        passReqToCallback   : true
    },
  function (accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            User.findOne({ 'googleID.id' : profile.id }, function (err, user) {
                if (err)
                    return done(err);
                
                if (user) {
                    
                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser = new User();
                    
                    // set all of the relevant information
                    newUser.googleID.id = profile.id;
                    newUser.googleID.token = token;
                    newUser.googleID.name = profile.displayName;
                    newUser.googleID.email = profile.emails[0].value;
                    newUser.email = profile.emails[0].value;
                    
                    // save the user
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });

        });
    }
    ));
}
