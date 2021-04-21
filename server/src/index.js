const express = require('express');
const http = require('http');
const { serverPort } = require('./constants');
const router = require('./router');

const app = express();
app.use(express.json());
app.use(router);

const server = http.createServer(app);
server.listen(serverPort, () =>
  console.log(`App listening on port ${serverPort}!`)
);
