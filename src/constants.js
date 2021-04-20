const mongoConfig = {
  host: 'localhost',
  port: '27017',
  db: 'tracks-db',
  options: { useUnifiedTopology: true, useNewUrlParser: true },
};

const serverPort = 3000;

module.exports.mongoConfig = mongoConfig;
module.exports.serverPort = serverPort;
