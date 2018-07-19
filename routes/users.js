'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

/* GET organisations listing. */
router.get('/', (req, res, next) => {
  let query = {};
  if (req.query.category) {
    query = {categories: {$in: [req.query.category]}};
  }
  User.find(query)
    .then((result) => {
      const data = {
        users: result,
        category: req.query.category
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
      if (!req.session.currentUser && !result.isActive) {
        res.redirect('/');
        return;
      }
      const owner = req.session.currentUser._id === result.id;
      const data = {
        user: result
      };
      if (!result.isActive && !owner) {
        res.redirect('/');
        return;
      } else if (result.isActive && !owner) {
        res.render('org-details', data);
        return;
      }
      if (!result.isActive && owner) {
        data.showEdit = true;
        data.activeWarning = true;
      }
      res.render('org-details', data);
    })

    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
