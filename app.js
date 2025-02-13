var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var expenseRouter = require('./routes/expense');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const mongoose = require('mongoose');
let DB = require('./db');
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error'));
mongoDB.once('open',()=>{console.log("Connected with MongoDB")});
mongoose.connect(DB.URI,{useNewURIParser:true,useUnifiedTopology:true});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));


app.use('/', expenseRouter);
app.use('/users', usersRouter);
app.use('/expenseList', expenseRouter);

app.use(function(req, res, next) {
    next(createError(404));
});


app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

  
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;