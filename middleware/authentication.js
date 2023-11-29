const { UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const authHead = req.headers.authorization;
  if (!authHead || !authHead.startsWith('Bearer '))
    throw new UnauthenticatedError('invalid token');

  const token = authHead.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === '65672b2b7458a9eb88b8a9d9';
    req.user = {
      userId: payload.userId,
      testUser,
    };
    next();
  } catch (err) {
    throw new UnauthenticatedError('You cant access this route');
  }
};

module.exports = auth;
