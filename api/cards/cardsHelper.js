const db = require('../../data/dbConfig.js');

module.exports = {
  getAll,
  getCardById,
  addCard,
  removeCard,
  updateCard,
};

async function getAll(id) {
  return db('cards')
    .where('user_id', id);
};

async function getCardById(id) {
  return db('cards')
    .where('id', id);
};

async function addCard(newCard) {
  return db('cards')
    .insert(newCard);
};

async function removeCard(id) {
  return db('cards')
    .where('id', id)
    .delete();
};

async function updateCard(id, updatedCard) {
  return db('cards')
    .where('id', id)
    .update(updatedCard);
};