'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.render('edit-profile');
});

router.post('/', (req, res, next) => {
  const currentUser = req.session.currentUser;

  const categories = [
    {
      name: 'medicine',
      isChecked: !!req.body.medicine
    },
    {
      name: 'education',
      isChecked: !!req.body.education
    },
    {
      name: 'food',
      isChecked: !!req.body.food
    }
  ];

  const data = {
    description: req.body.description,
    phone: req.body.phone,
    mail: req.body.mail,
    website: req.body.website,
    categories: categories
  };

  User.findByIdAndUpdate(currentUser._id, data)
    .then(() => {
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
