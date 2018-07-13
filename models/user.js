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
  categories: {
    type: String,
    // required: true,
    enum: ['Medicines', 'Food', 'Education']
  },
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
  linkedin: {
    type: String
  },
  website: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
