'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

/* GET organisations listing. */
router.get('/', (req, res, next) => {
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

module.exports = router;
