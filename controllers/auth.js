const { StatusCodes } = require('http-status-codes');
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require('../errors/index');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    throw new UnauthenticatedError('Invalid Credentials');

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  });
};

const updateUser = async (req, res) => {
  const { name, lastName, email, location } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { name, lastName, email, location },
    { new: true, runValidators: true }
  );

  if (!user) throw new NotFoundError('User does not exist');

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  });
};

module.exports = { register, login, updateUser };
