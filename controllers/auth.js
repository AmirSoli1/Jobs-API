const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors/index');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    throw new BadRequestError('Please fill in all the fields');

  const user = await User.create({ name, email, password });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError('Please fill in all the fields');

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    throw new UnauthenticatedError('Invalid Credentials');

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
