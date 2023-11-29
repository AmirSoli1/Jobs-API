const express = require('express');
const authRouter = express.Router();

const auth = require('../middleware/authentication');

const { register, login, updateUser } = require('../controllers/auth');

authRouter.route('/register').post(register);
authRouter.route('/login').post(login);
authRouter.route('/updateUser').patch(auth, updateUser);

module.exports = authRouter;
