var UserModel = require('../models/user');
var jwt = require('jwt-simple');

module.exports = function (req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    
    if (token) {
        req.user = jwt.decode(token, 'xbJ9Phit');
        next();
    } 
    else {
        res.sendStatus(403);
    }
};
