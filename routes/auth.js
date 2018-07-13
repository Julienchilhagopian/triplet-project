'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user');

// SIGNUP

router.get('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }

  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }
  if (!req.body.username || !req.body.password) {
    // message please provide a username and password
    res.redirect('/auth/signup');
    return;
  }
  User.findOne({username: req.body.username})
    .then((user) => {
      if (user) {
        return res.redirect('/auth/signup');
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword
      });

      return newUser.save()
        .then(() => {
          req.session.currentUser = newUser;
          res.redirect('/');
        });
    })
    .catch(next);
});

// LOGIN

router.get('/login', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }
  // For later maybe use ajax
  // const data = {
  //   messages: req.flash('login-error')
  // };

  res.render('auth/login');
});

router.post('/login', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }
  if (!req.body.username || !req.body.password) {
    // flash here
    res.redirect('/auth/login');
    return;
  }
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        // flash here
        res.redirect('/auth/login');
        return;
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        // flash here
        res.redirect('/auth/login');
        return;
      }
      req.session.currentUser = user;
      res.redirect('/');
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

module.exports = router;
