var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var dbUrl = 'mongodb://localhost/swordblog';

var mongoose = require('mongoose');
mongoose.connect(dbUrl);

var indexs = require('./routes/index');
var users = require('./routes/users');
var article = require('./routes/article');
var aboutme = require('./routes/aboutme');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views/pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: 'SwordBlog',
  resave: false,
  saveUninitialized: false,
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');

// development print log
if ('development' === app.get('env')) {
  app.use(logger(':method :url :status :remote-addr'));
}

app.use('/', indexs);
app.use('/users', users);
app.use('/article', article);
app.use('/aboutme', aboutme);

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
  app.set('showStackError', true);
  mongoose.set('debug', true);
  app.locals.pretty = true;
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('../error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('../error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
