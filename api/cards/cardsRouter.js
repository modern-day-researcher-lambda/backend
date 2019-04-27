const express = require('express');
const userDB = require('../users/usersHelper.js');
const cardsDB = require('./cardsHelper.js');
const { auth } = require('../../auth/authenticate.js');
const cardsRouter = express.Router();

// GET USERS CARDS
cardsRouter.get('/users/:id', auth, async (req, res) => {
  const { id } = req.params;
  const cards = await cardsDB.getAll(id);
    
    if(cards.length > 0) {
      res.status(200).json(cards);
    } else {
      res.status(404).json({ message: 'Could not get any cards' });
    }
});

// GET CARD BY ID
cardsRouter.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const rows = await cardsDB.getCardById(id);

  if(rows.length > 0) {
    res.status(200).json(rows);
  } else {
    res.status(404).json({ message: 'Could not find any cards' });
  };
});

// ADD NEW CARD
cardsRouter.post('/users', auth, async (req, res) => {
  const newCard = req.body;
  const id = req.body.user_id;

  if(newCard.title && newCard.category) {
    const ids = await cardsDB.addCard(newCard)
    if(ids) {
      const cards = await cardsDB.getAll(id);
      res.status(201).json(cards);
    } else {
      res.status(500).json({ message: 'Could not add card' });
    }
  } else {
    res.status(400).json({ message: 'Please fill required fields' });
  };
});

// REMOVE CARD
cardsRouter.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  if(id) {
    const remove = await cardsDB.removeCard(id);
    res.status(202).json(remove);
  } else {
    res.status(500).json({ message: 'Internal server error' });
  };
});

// UPDATE A CARD
cardsRouter.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const updatedCard = req.body;

  if(!id) {
    res.status(404).json({ message: 'That card does not exist' });
  } else {
    if(updatedCard) {
      const update = await cardsDB.updateCard(id, updatedCard);
      res.status(202).json(update)
    } else {
      res.status(500).json({ message: 'Card could not be updated' });
    };
  };
});

module.exports = cardsRouter;
