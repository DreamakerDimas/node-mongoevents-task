const express = require('express');
const http = require('http');
const { serverPort } = require('./constants');

const app = express();
app.use(express.json());

const server = http.createServer(app);
server.listen(serverPort, () =>
  console.log(`App listening on port ${serverPort}!`)
);
