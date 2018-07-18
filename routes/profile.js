'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/edit', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/');
  }

  User.findById(req.session.currentUser._id)
    .then((user) => {
      const data = {
        messages: req.flash('edit-profile-error'),
        user: user
      };
      res.render('profile-edit', data);
    });
});

router.post('/edit', (req, res, next) => {
  const currentUser = req.session.currentUser;

  if (!currentUser) {
    return res.redirect('/');
  }

  if (!req.body.description) {
    req.flash('edit-profile-error', 'Description is required');
    return res.redirect('/profile/edit');
  }
  if (!req.body.mail) {
    req.flash('edit-profile-error', 'Email is required');
    return res.redirect('/profile/edit');
  }
  if (!req.body.medicine && !req.body.food && !req.body.education) {
    req.flash('edit-profile-error', 'Please select at least one type of organisation');
    return res.redirect('/profile/edit');
  }
  console.log(req.body);
  const categories = [];

  if (req.body.medicine) {
    categories.push('medicine');
  }

  if (req.body.food) {
    categories.push('food');
  }

  if (req.body.education) {
    categories.push('education');
  }

  const data = {
    username: req.body.username,
    description: req.body.description,
    phone: req.body.phone,
    mail: req.body.mail,
    website: req.body.website,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    twitter: req.body.twitter,
    categories: categories
  };

  const options = {new: true};

  User.findByIdAndUpdate(currentUser._id, data, options)
    .then((user) => {
      req.session.currentUser = user;
      res.redirect('/');
    });
});

module.exports = router;
