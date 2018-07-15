'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.render('edit-profile');
});

router.post('/edit-profile', (req, res, next) => {
  const newDescription = req.body.description;
  const currentUser = req.session.currentUser;
  User.findByIdAndUpdate({_id: currentUser._id}, {$push: {description: newDescription}})
    .then(() => {
      console.log('testing');
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
