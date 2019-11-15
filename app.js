const createError = require('http-errors');
const express = require('express');
const http = require('http');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const util = require('util');
// const logger = require('morgan');
const passport = require('passport');
const routes = require('./routes/main');
const app = express();
const mongoose = require('mongoose');


const mongoDB = 'mongodb://127.0.0.1/therapy-box';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // view engine setup
// app.engine('ejs', require('ejs-locals'));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// app.use(multer({ storage: storage }).any());

app.use(session({
  name: 'session',
  secret: 'keyboard cat',
  proxy: true,
  resave: true,
  saveUninitialized: true }));
// app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'uploads')));

// pasport must always to be under all models and before all routes
// require('./config/passport_old')(passport);
// app.use(passport.initialize());
// app.use(passport.session());

// unused
// passport.use(auth.googleStrategy);
// passport.serializeUser(auth.serializeUser);
// passport.deserializeUser(auth.deserializeUser);

// app.use(flash());

app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error = req.app.get('env') === 'development' ? err : err;  // always show the errors

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
