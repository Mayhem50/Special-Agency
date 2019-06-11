var app = require('../../app');
var session = require('express-session');

app.use(session({
    secret: 'special-agency-s3cr3t',
    name: 'special-agency-cookie',
    //store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
