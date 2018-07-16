'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

/* GET organisations listing. */
router.get('/', (req, res, next) => {
  console.log(req.query);
  User.find()
    .then((result) => {
      const data = {
        users: result
      };
      res.render('org-list', data);
    })
    .catch(error => {
      console.log(error);
    });
});

/* GET organisations listing. */
router.get('/:id', (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((result) => {
      const data = {
        user: result
      };
      res.render('org-details', data);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
