'use strict';

// --------- App init --------- //

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// --------- Require routes --------- //

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

// --------- Express init --------- //

const app = express();

// --------- View engine setup --------- //

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// --------- Middlewares --------- //

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --------- Setup routes --------- //

app.use('/', indexRouter);
app.use('/org', usersRouter);
app.use('/auth', authRouter);

// --------- 404 and Error handler --------- //

app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

app.use((err, req, res, next) => {
  console.error('ERROR', req.method, req.path, err);
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;
