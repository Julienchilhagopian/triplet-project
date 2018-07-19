'use strict';

// --------- App init --------- //
require('dotenv').config();
const flash = require('connect-flash');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cloudinary = require('cloudinary');

// --------- Require routes --------- //

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const activateRouter = require('./routes/activate');

// --------- Express init --------- //

const app = express();

// --------- mongoose connect --------- //
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// --------- View engine setup --------- //

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// --------- Middlewares --------- //

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// --------- session --------- //
app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// --------- Current user --------- //

app.use((req, res, next) => {
  app.locals.currentUser = req.session.currentUser; // this create a local variable.
  next();
});

// --------- Cloudinary set up --------- //

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// --------- Setup routes --------- //

app.use('/', indexRouter);
app.use('/org', usersRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/activate', activateRouter);

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
