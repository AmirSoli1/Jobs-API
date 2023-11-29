const express = require('express');
const authRouter = express.Router();

const auth = require('../middleware/authentication');
const testUser = require('../middleware/test-user');

const { register, login, updateUser } = require('../controllers/auth');

authRouter.route('/register').post(register);
authRouter.route('/login').post(login);
authRouter.route('/updateUser').patch(auth, testUser, updateUser);

module.exports = authRouter;
