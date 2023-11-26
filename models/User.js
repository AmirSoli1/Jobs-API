const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: [20, 'name cant be longer than 20 characters'],
    minLength: [2, 'name must have at least 2 characters'],
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    maxLength: [20, 'password cant be longer than 20 characters'],
    minLength: [6, 'password must have at least 6 characters'],
  },
});

module.exports = mongoose.model('User', userSchema);
