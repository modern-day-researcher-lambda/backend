const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;

const server = express();

server.use(express.json());

server.listen(PORT);

module.exports = server;