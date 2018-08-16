'use strict';

const express = require('express');
const router = express.Router();
// const nodemailer = require('nodemailer');

const User = require('../models/user');

router.get('/', (req, res, next) => {
  User.update({}, {isActive: true}, {multi: true})
    .then((result) => {
      res.redirect('/');

      // let transporter = nodemailer.createTransport({
      //   service: 'Gmail',
      //   auth: {
      //     user: 'helpvzlaproject@gmail.com',
      //     pass: 'tripletsproject'
      //   }
      // });
      // transporter.sendMail({
      //   from: '"HelpVzla" <helpvzlaproject@gmail.com>',
      //   to: req.body.mail,
      //   subject: 'Your account has been activated',
      //   text: 'Now your organisation is part of HelpVzla',
      //   html: `<b>Now your organisation is part of HelpVzla</b>`
      // });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
