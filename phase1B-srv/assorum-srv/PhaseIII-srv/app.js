var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
//var users = require('./routes/users');

var associations = require('./routes/associations');
var clients = require('./routes/clients');
var departments = require('./routes/departments');
var events = require('./routes/events');
var locations = require('./routes/locations');
var memberships = require('./routes/memberships');
var ranks = require('./routes/ranks');
var tags = require('./routes/tags');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//For catching favicon error 500
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(200);
});

app.use('/', routes);
//app.use('/users', users);
app.use('/associations', associations);
app.use('/clients', clients);
app.use('/departments',departments);
app.use('/events', events);
app.use('/locations', locations);
app.use('/memberships', memberships);
app.use('/ranks', ranks);
app.use('/tags', tags);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.code || 500)
    .json({
      status: 'error',
      message: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500)
//  .json({
//    status: 'error',
//    message: err.message
///  });
//});


module.exports = app;
