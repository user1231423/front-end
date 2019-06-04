var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//View setup
app.use(express.static(path.join(__dirname, 'views')));

//Components to use
app.use(cookieParser()); //Read cookies
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieSession({
    name: 'mysession',
    keys: ['authrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 //24 Horas
}))

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
    res.send(err);
});
module.exports = app;