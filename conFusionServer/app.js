var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var passport = require('passport')
var authenticate = require('./authenticate')
var config = require('./config')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dishRouter = require('./routes/dishRouter');
const leaderRouter = require('./routes/leaderRouter');
const promotionRouter = require('./routes/promotionRouter');
const uploadRouter = require('./routes/uploadRouter');
const favoriteRouter = require('./routes/favoriteRouter')

const Dishes = require('./models/dishes')

const url = config.mongoUrl

const connect = mongoose.connect(url)

connect.then((db) => {
  console.info('Connected to DB')
})
  .catch((err) => {
    console.info(err)
  })

var app = express();

app.all('*', (req, res, next) => {
  if (req.secure) {
    return next() //if request already secure
  } else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url) // redirect any insecure rec to https server
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321')); // Supply a key (any string) for using signed cookies

//auth with passport
app.use(passport.initialize())

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use(express.static(path.join(__dirname, 'public')));


// routes for dishes
app.use('/dishes', dishRouter)
// routes for promos
app.use('/promotions', promotionRouter)
// routes for leaders
app.use('/leaders', leaderRouter)
// routes for image upload
app.use('/imageUpload', uploadRouter)
// routes for favorites
app.use('/favorites', favoriteRouter)

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
