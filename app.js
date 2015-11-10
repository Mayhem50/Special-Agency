var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var cors = require('cors');

var app = module.exports = express();
var server = require('./server/controllers/server.js')(app);
var io = require('./server/controllers/socket.io.js')(server);

var db = require('./server/controllers/mongoose');
var session = require('./server/controllers/session');
var passport = require('./server/controllers/passport');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'app')));

//Configure App
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());

app.use(flash());

var http_index = require('./server/http_routes/index')();
var http_users = require('./server/http_routes/users')(passport);
var http_missions = require('./server/http_routes/missions')(passport);
var http_helpers = require('./server/http_routes/helpers')();
var http_kinds = require('./server/http_routes/kinds')();

app.use(http_index);
app.use(http_users);
app.use(http_missions);
app.use(http_helpers);
app.use(http_kinds);

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

