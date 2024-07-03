var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const bodyParser = require('body-parser');
const connectToMongo = require("./mongoConfig");

//Requiring our routes:
const userModel = require("./models/users")
const varificationRoute = require("./routes/varification");
const createBookRoute = require("./routes/createBook");
const showBooks = require("./routes/showBooks");
const deleteBook = require("./routes/deleteBook");
const updateBook = require("./routes/updateBook");
const bookStore = require("./routes/bookStore");

connectToMongo()
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "pinterest"
}))
app.use(passport.initialize())
app.use(passport.session());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Setting Up Our Routes:
app.use("/", varificationRoute);
app.use('/createbook', createBookRoute);
app.use("/showbooks", showBooks);
app.use("/deletebook", deleteBook);
app.use("/updatebook", updateBook);
app.use("/bookstore", bookStore);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
