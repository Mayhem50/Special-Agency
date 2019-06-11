var passport = module.exports = require('passport');

var app = require('../../app');
var init_passport = require('./passport/passport-init');

init_passport(passport);
app.use(passport.initialize());
app.use(passport.session());