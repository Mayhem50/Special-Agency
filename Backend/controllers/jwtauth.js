var User = require('../models/user');
var jwt = require('jwt-simple');

module.exports = function (req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    
    if (token) {

        var id = jwt.decode(token, 'xbJ9Phit');

        User.findOne({ _id : id }, function (err, user) {
            if (err)
                return done(err);

            if (!user) {
                return res.sendStatus(403);
            }
            
            req.user = user;
            return next();
        });
    } 
    else {
        res.sendStatus(403);
    }
};
