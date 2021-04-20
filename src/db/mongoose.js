const mongoose = require('mongoose');
const { mongoConfig } = require('../constants');

console.log('mongo');

mongoose.connect(
  `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.db}`,
  mongoConfig.options,
  (err) => {
    console.log('Mongo error:\n', err);
    process.exit(1);
  }
);

module.exports = mongoose;
