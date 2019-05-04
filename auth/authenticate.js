const jwt = require('jsonwebtoken');
require('dotenv');

// const jwtKey = process.env.JWT_SECRET;
const jwtKey = 'asoidfjopaiwenfolsadf';

function auth (req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtKey, (err, decodedToken) => {
      if (err) res.status(401).json({ message: 'Invalid token '});
      else next();
    });
  } else {
    res.status(401).json({ message: 'No Token Provided' });
  };
};

module.exports = {
  jwtKey, auth
}