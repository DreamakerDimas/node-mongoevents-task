const mongoose = require('mongoose');
const { mongoConfig } = require('../constants');

mongoose.connect(
  `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.db}`,
  mongoConfig.options,
  (err) => {
    if (err) {
      console.log('Mongo error:\n', err);
      process.exit(1);
    }
    console.log('Mongo connected!');
  }
);

module.exports = mongoose;
