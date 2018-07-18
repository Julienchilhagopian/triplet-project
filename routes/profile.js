'use strict';

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const User = require('../models/user');

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

  if (!req.body.description) {
    req.flash('edit-profile-error', 'Description is required');
    return res.redirect('/profile/edit');
  }

  if (!req.body.mail) {
    req.flash('edit-profile-error', 'Email is required');
    return res.redirect('/profile/edit');
  }

  if (!req.body.medicine && !req.body.food && !req.body.education) {
    req.flash('edit-profile-error', 'Please select at least one type of organisation');
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
      // MAILER

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

module.exports = router;
