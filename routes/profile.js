'use strict';

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const User = require('../models/user');
const upload = require('../middlewares/upload');

router.get('/edit', (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/');
  }

  User.findById(req.session.currentUser._id)
    .then((user) => {
      let hasCategoryMedicine;
      let hasCategoryFood;
      let hasCategoryEducation;

      if (user.categories.includes('medicine')) {
        hasCategoryMedicine = true;
      }

      if (user.categories.includes('food')) {
        hasCategoryFood = true;
      }

      if (user.categories.includes('education')) {
        hasCategoryEducation = true;
      }

      const data = {
        messages: req.flash('edit-profile-error'),
        previousData: req.flash('edit-profile-data')[0],
        user: user,
        hasCategoryMedicine: hasCategoryMedicine,
        hasCategoryFood: hasCategoryFood,
        hasCategoryEducation: hasCategoryEducation
      };
      res.render('profile-edit', data);
    });
});

router.post('/edit', (req, res, next) => {
  const currentUser = req.session.currentUser;

  if (!currentUser) {
    return res.redirect('/');
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

  const previousData = req.body;
  previousData.categories = categories;

  if (!req.body.description) {
    req.flash('edit-profile-data', previousData);
    req.flash('edit-profile-error', 'Description is required');
    return res.redirect('/profile/edit');
  }

  if (!req.body.mail) {
    req.flash('edit-profile-data', previousData);
    req.flash('edit-profile-error', 'Email is required');
    return res.redirect('/profile/edit');
  }

  if (!req.body.medicine && !req.body.food && !req.body.education) {
    req.flash('edit-profile-data', previousData);
    req.flash('edit-profile-error', 'Please select at least one type of organisation');
    return res.redirect('/profile/edit');
  }

  const data = {
    username: req.body.username,
    description: req.body.description,
    isActive: false,
    phone: req.body.phone,
    mail: req.body.mail,
    website: req.body.website,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    twitter: req.body.twitter,
    categories: categories
  };

  const options = {new: true};

  // --------- Mail part --------- //
  User.findByIdAndUpdate(currentUser._id, data, options)
    .then((user) => {
      req.session.currentUser = user;

      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'helpvzlaproject@gmail.com',
          pass: 'tripletsproject'
        }
      });
      transporter.sendMail({
        from: '"HelpVzla" <helpvzlaproject@gmail.com>',
        to: data.mail,
        subject: 'Thank you for signing up in HelpVzla',
        text: 'We will verify your account and activate it in 48 hours',
        html: `<b>We will verify your account and activate it in 48 hours</b>`
      });
      transporter.sendMail({
        from: data.mail,
        to: '"HelpVzla" <helpvzlaproject@gmail.com>',
        subject: 'A new organisation has signed up in HelpVzla',
        text: 'The account should be verified and activated in 48 hours',
        html: `<b>The account should be verified and activated in 48 hours</b>`
      });
      res.redirect('/');
    });
});

// --------- File upload part --------- //
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
