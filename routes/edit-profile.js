'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .then((user) => {
      res.render('edit-profile', user);
    });
});

router.post('/', (req, res, next) => {
  const currentUser = req.session.currentUser;

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
    categories: categories
  };

  const options = {new: true};

  User.findByIdAndUpdate(currentUser._id, data, options)
    .then((user) => {
      req.session.currentUser = user;
      res.redirect('/');
    });
});

// // post /edit-profile
// // PRERTMISSIONS?
// // VALIDATE Post body
//   User.findOneAndUpdate({_id: the id of the cuurent user}, UPDATEDATA)
//     .then((updatedUser) = { // HOW TO UPDATE AND RETURN UPDATED DOCUMENT
//       req.session.currentUser = updaTEDuSER

//     })

module.exports = router;
