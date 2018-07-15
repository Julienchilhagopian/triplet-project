const mongoose = require('mongoose');
const User = require('../models/user');

const organisations = [
  {
    username: 'A Wrinkle in Time',
    password: 123
  }
];

User.create(organisations)
  .then(() => {
    console.log(`Created ${organisations.length} movies`);
    mongoose.connection.close();
  })
  .catch((err) => {
    throw (err);
  });
