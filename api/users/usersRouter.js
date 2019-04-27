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

// REGISTER NEW USER
usersRouter.post('/register', async (req, res) => {
  const newUser = req.body;
  if(newUser.username && newUser.password) {
    const duplicate = await db.checkForUsername(newUser);
    if(duplicate.length > 0) {
      res.status(422).json({ message: 'Username already exists.' });
    } else {
      const hash = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hash;
      const ids = await db.addUser(newUser);
      if(ids) {
        const id = ids[0];
        const user = await db.getUserById(id);
        if(user) {
          const token = generateToken(user);
          if(token) {
            res.status(201).send({ token });
          } else {
            res.status(500).json({ message: 'Error generating token.' });
          }
        } else {
          res.status(500).json({ message: 'Error finding user in the database' });
        }
      } else {
        res.status(500).json({ message: 'Error adding user to database' });
      }
    }
  } else {
      res.status(422).json({ message: 'Missing username or password.' });
  };
});

// LOGIN USER
usersRouter.post('/login', async (req, res) => {
  const creds = req.body;
  if(creds.username && creds.password) {
    const user = await db.checkForUsername(creds);
    if(user.length > 0) {
      if(bcrypt.compareSync(creds.password, user[0].password)) {
        const token = generateToken(user);
        res.status(201).send({ token });
      } else {
        res.status(401).json({ message: 'incorrect username or password' });
      }
    } else {
      res.status(401).json({ message: 'incorrect username or password' });
    }
  } else {
    res.status(422).json({ message: 'Missing username or password' });
  }
});

module.exports = usersRouter;