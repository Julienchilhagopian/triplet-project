'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  categories: [{
    type: String,
    enum: ['medicine', 'food', 'education']
  }],
  description: {
    type: String
  },
  phone: {
    type: String
  },
  mail: {
    type: String
  },
  facebook: {
    type: String
  },
  instagram: {
    type: String
  },
  twitter: {
    type: String
  },
  website: {
    type: String
  },
  imgUrl: {
    type: String,
    default: '../images/iStock-608003210.jpg'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
