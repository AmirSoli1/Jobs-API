const { UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const authHead = req.headers.Authorization;
  if (!authHead || !authHead.startsWith('Bearer '))
    throw new UnauthenticatedError('invalid token');

  const token = authHead.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
      name: payload.name,
    };
    next();
  } catch (err) {
    throw new UnauthenticatedError('You cant access this route');
  }
};

module.exports = auth;
