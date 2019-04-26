const express = require('express');
const db = require('./categoryHelper.js');
const { auth } = require('../../auth/authenticate.js');
const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res) => {
  // const rows = await db.getAll();
})

module.exports = categoryRouter;