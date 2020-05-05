var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dishRouter = require('./routes/dishRouter');
const leaderRouter = require('./routes/leaderRouter');
const promotionRouter = require('./routes/promotionRouter');

const Dishes = require('./models/dishes')

const url = 'mongodb://localhost:27017/conFusion'

const connect = mongoose.connect(url)

connect.then((db) => {
  console.info('Connected to DB')
})
  .catch((err) => {
    console.info(err)
  })

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//for authentication
function auth(req, res, next) {
  console.log(req.headers)
  var authHeader = req.headers.authorization

  if (!authHeader) {
    var err = new Error('You not atuhenticated')
    res.setHeader('WWW-Authenticate', 'Basic')
    err.status = 401
    next(err)
  }

  var auth = new Buffer(authHeader.split(' ')[1],'base64').toString().split(':') //array with username and pass extracted from base64 string
  var username = auth[0]
  var pass = auth[1]

  if ( username === 'admin' && pass === 'password') {
    next()
  } else {
    var err = new Error('You not atuhenticated')
    res.setHeader('WWW-Authenticate', 'Basic')
    err.status = 401
    next(err)
  }

  
}
app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// routes for dishes
app.use('/dishes', dishRouter)
// routes for promos
app.use('/promotions', promotionRouter)
// routes for leaders
app.use('/leaders', leaderRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
