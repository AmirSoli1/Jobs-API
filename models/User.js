const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  const token = jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  return token;
};

userSchema.methods.comparePassword = async function (pass) {
  const isMatch = await bcrypt.compare(pass, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', userSchema);
