const express = require('express');
const db = require('./categoryHelper.js');
const { auth } = require('../../auth/authenticate.js');
const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res) => {
  const rows = await db.getAll();
  if(rows.length > 0) {
    res.status(200).json(rows);
  } else {
    res.status(500).json({ message: 'There was an error getting card data' });
  };
});

module.exports = categoryRouter;