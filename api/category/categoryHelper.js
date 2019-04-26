const db = require('../../data/dbConfig.js');

module.exports = {
  getAll,
  getCategoryById,
  checkForCategory,
};

async function getAll() {
  return db('category');
};

async function getCategoryById(id) {
  return db('category')
    .where('id', id);
};

async function checkForCategory(newCategory) {
  return db('category')
    .where('title', newCategory.title);
};