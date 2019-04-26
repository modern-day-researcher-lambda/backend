const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;

const usersRouter = require('./api/users/usersRouter.js');
const categoryRouter = require('./api/category/categoryRouter.js');
const cardsRouter = require('./api/cards/cardsRouter.js');

const server = express();

server.use(express.json());
server.use('/users', usersRouter);
server.use('/category', categoryRouter);
// server.use('/users', cardsRouter);

server.listen(PORT);

module.exports = server;