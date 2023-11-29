const express = require('express');
const authRouter = express.Router();

const auth = require('../middleware/authentication');
const testUser = require('../middleware/test-user');

const apiLimiter = require('../middleware/api-limiter');

const { register, login, updateUser } = require('../controllers/auth');

authRouter.route('/register').post(apiLimiter, register);
authRouter.route('/login').post(apiLimiter, login);
authRouter.route('/updateUser').patch(auth, testUser, updateUser);

module.exports = authRouter;
