﻿var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var cors = require('cors');

var app = module.exports = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.set('JwtSecret', 'xbJ9Phit');

var db = require('./server/controllers/mongoose');
var session = require('./server/controllers/session');
var passport = require('./server/controllers/passport');


app.use(express.static(path.join(__dirname, 'app')));

//Configure App
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());

app.use(flash());

var index = require('./server/routes/index')();
var users = require('./server/routes/users')(passport);
var missions = require('./server/routes/missions')(passport);
var helpers = require('./server/routes/helpers')();

app.use(index);
app.use(users);
app.use(helpers);
app.use(missions);

//app.use(csrf());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send(err.message);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

