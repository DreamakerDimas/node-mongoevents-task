const mongoConfig = {
  host: 'mongodb',
  port: '27017',
  db: 'tracks-db',
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    directConnection: true, // ! important for this Replica Set !
    useFindAndModify: false,
    replicaSet: 'rs0',
  },
};

const serverPort = 4000;

module.exports.mongoConfig = mongoConfig;
module.exports.serverPort = serverPort;
