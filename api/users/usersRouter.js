const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { jwtKey } = require('../../auth/authenticate.js');
const db = require('./usersHelper.js');

const usersRouter = express.Router();

function generateToken(user) {
  const payload = { username: user.username }
  const options = { expiresIn: '1h' }
  return jwt.sign(payload, jwtKey, options);
};

module.exports = usersRouter;