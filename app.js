"use strict";
var express = require('express');
require('dotenv').config();
var mongoose = require('mongoose')
const CardModal = require('./models/CardData')

try {
  mongoose.connect(
    process.env.DBURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
} catch (error) {
  console.log(error)
  process.exit()
}

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var redirector = require("redirect-https")({
  body: ""
});

app.use("/", redirector);


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
