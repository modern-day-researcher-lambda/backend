const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT;

const usersRouter = require('./api/users/usersRouter.js');
const cardsRouter = require('./api/cards/cardsRouter.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use('/users', usersRouter);
server.use('/cards', cardsRouter);

server.listen(PORT);

module.exports = server;