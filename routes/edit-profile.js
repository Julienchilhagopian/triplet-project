'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.render('edit-profile');
});

router.post('/', (req, res, next) => {
  console.log(req);
  const newDescription = req.body.description;
  const currentUser = req.session.currentUser;
  console.log('testing');
  User.findByIdAndUpdate(currentUser._id, {description: newDescription})
    .then(() => {
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
