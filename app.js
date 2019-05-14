var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var foodsRouter = require('./routes/api/v1/foods');
var mealsRouter = require('./routes/api/v1/meals');
var usersRouter = require('./routes/api/v1/users');
var sessionsRouter = require('./routes/api/v1/sessions');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/foods', foodsRouter)
app.use('/api/v1/meals', mealsRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/sessions', sessionsRouter)

module.exports = app;
