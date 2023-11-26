const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, ' Please provide a name'],
    lowercase: true,
    maxLength: [20, 'name cant be longer than 20 characters'],
    minLength: [3, 'name must have at least 3 characters'],
  },
  email: {
    type: String,
    required: [true, ' Please provide an email'],
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, ' Please provide a password'],
    minLength: [6, 'password must have at least 6 characters'],
  },
});

module.exports = mongoose.model('User', userSchema);
