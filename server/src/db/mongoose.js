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

    // check if replica already configured
    var conn = mongoose.createConnection(
      `mongodb://${mongoConfig.host}:${mongoConfig.port}/admin`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    conn.on('open', function () {
      conn.db.command({ replSetGetStatus: 1 }, (err) => {
        if (err) process.exit(1); // exit if don't
      });
    });

    console.log('Mongo connected!');
  }
);

module.exports = mongoose;
