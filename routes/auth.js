'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user');

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

module.exports = router;
