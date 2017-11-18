var express = require('express');

var path = require('path');
var logger = require('morgan');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public')));

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
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var pug = require('pug');


var filters = {
  'my-own-filter': function (text, options) {
    if (options.addMD) text = '``js ' + text + '```';
    return text.trim();
  },
  'my-own-filter2': function (text, options) {
    return text;
  },
  'my-own-filter3': function (text, options) {
    return text.replace('```js','').replace('```','');
  }
};

pug.filters = filters;





module.exports = app;

