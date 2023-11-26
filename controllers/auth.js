const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors/index');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    throw new BadRequestError('Please fill in all the fields');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = (req, res) => {
  res.status(200).send('login');
};

module.exports = { register, login };
