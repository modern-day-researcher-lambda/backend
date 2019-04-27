const db = require('../../data/dbConfig.js');

module.exports = {
  getAll,
  addUser,
  getUserById,
  checkForUsername
};

async function getAll() {
  return db('users');
};

async function addUser(newUser) {
  return db('users')
    .insert(newUser);
};

async function getUserById(id) {
  return db('users')
      .where('id', Number(id));
};

async function checkForUsername(newUser) {
  return db('users')
    .where('username', newUser.username);
};