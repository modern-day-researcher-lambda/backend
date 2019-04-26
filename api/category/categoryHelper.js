const db = require('../../data/dbConfig.js');

module.exports = {
  getAll,
  getCategoryById,
};

async function getAll() {
  return db('category');
};

async function getCategoryById(id) {
  return db('category')
    .where('id', Number(id));
};