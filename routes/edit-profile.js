'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.render('edit-profile');
});

router.post('/', (req, res, next) => {
  const currentUser = req.session.currentUser;

  const data = {
    description: req.body.description,
    phone: req.body.phone
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
//     .then((uatedUser) = { // HOW TO UPDATE AND RETURN UPDATED DOCUMENT
//       req.session.currentUser = updaTEDuSER

//     })

module.exports = router;
