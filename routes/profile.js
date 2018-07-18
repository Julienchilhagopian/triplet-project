'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');
const upload = require('../middlewares/upload');

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

  if (!req.body.description || !req.body.mail) {
    req.flash('edit-profile-error', 'Description, email and type of organisation are required');
    return res.redirect('/profile/edit');
  }
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



























































router.get('/edit/org-picture', (req, res, next) => {
  return res.render('orgpic');
});

router.post('/edit/org-picture', upload.single('photo'), (req, res, next) => {
  const currentUser = req.session.currentUser;

  if (!req.file) {
    return res.redirect('/profile/edit');
  }
  const imgUrl = req.file.url;

  const data = {
    $set: {
      imgUrl: imgUrl
    }
  };

  const options = {new: true};

  User.findByIdAndUpdate(currentUser._id, data, options)
    .then((user) => {
      req.session.currentUser = user;
      res.redirect('/');
    })
    .catch(next);
});

module.exports = router;
