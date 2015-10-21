var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');
var bCrypt = require('bcrypt-nodejs');
var util = require('util');

var agentsCount;

var setNumberofDocuments = function (err, count) {
    if (err) return done(err);
    
    agentsCount = count;
};

User.count({}, setNumberofDocuments);

function getNumberOfDocuments(){
    return agentsCount;
}

module.exports = function (passport) {
    
    passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
        function (req, username, password, done) {
        console.log(username);
        console.log(password);
        
        findOrCreateUser = function () {
            // find a user in Mongo with provided username
            User.findOne({ 'username' : username }, function (err, user) {
                // In case of any error, return using the done method
                if (err) {
                    console.log('Error in SignUp: ' + err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists with username: ' + username);
                    return done(null, false, user);
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    
                    // set the user's local credentials
                    newUser.email = username;
                    newUser.password = createHash(password);
                    newUser.firstName = req.query.firstName;
                    newUser.lastName = req.query.lastName;
                    newUser.gender = req.query.gender;
                    
                    if (typeof req.query.address !== 'undefined') {
                        newUser.address.number = req.query.address.number;
                        newUser.address.street = req.query.address.street;
                        newUser.address.state = req.query.address.state;
                        newUser.address.zip = req.query.address.query;
                    }
                    
                    var agentCount = getNumberOfDocuments();
                    var hundredThousand = parseInt(agentCount / 100000);
                    agentCount -= hundredThousand * 100000;
                    var tenThousand = parseInt(agentCount / 10000);
                    agentCount -= tenThousand * 10000;
                    var thousand = parseInt(agentCount / 1000);
                    agentCount -= thousand * 1000;
                    var hundred = parseInt(agentCount / 100 );
                    agentCount -= hundred * 100;
                    var ten = parseInt(agentCount / 10 );
                    agentCount -= ten * 10;
                    var unit = parseInt(agentCount);

                    newUser.agentID = util.format('%d%d%d-%d%d%d', hundredThousand, tenThousand, thousand, hundred, ten, unit);
                    newUser.avatar = '../images/'; // TODO save data
                    newUser.rank = 0;
                    newUser.birthDate = Date(1983, 01, 10);
                    newUser.missionsDone = 0;
                    //TODO set other parameter !!
                    
                    // save the user
                    newUser.save(function (err) {
                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        };
        // Delay the execution of findOrCreateUser and execute the method
        // in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    })
    );
    
    // Generates hash using bCrypt
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}