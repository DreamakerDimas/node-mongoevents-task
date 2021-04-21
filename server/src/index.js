const express = require('express');
const http = require('http');
const { serverPort } = require('./constants');
const router = require('./router');

const Tracks = require('./db/models/track');
const { sendInsertEvent } = require('./functions/events');

const app = express();
app.use(express.json());
app.use(router);

const server = http.createServer(app);
server.listen(serverPort, () =>
  console.log(`App listening on port ${serverPort}!`)
);

// watcher
const tracksEventEmitter = Tracks.watch();

tracksEventEmitter.on('change', async (change) => {
  // operationType: insert, update, delete
  // fullDocument
  console.log(JSON.stringify(change, null, 2));

  switch (change.operationType) {
    case 'insert':
      // run insert func
      console.log('insert event');
      console.log(await sendInsertEvent(change.fullDocument));
      return;
    case 'update':
      // run update func
      console.log('update event');
      return;
    case 'delete':
      // run delete func
      console.log('delete event');
      return;
  }
});

// 60804f514a0ca40013cc2adb title: 54321

// delete:
// {
//   "_id": {
//     "_data": "8260805090000000012B022C0100296E5A10047C3BEC3335304A71B3013411589F09A746645F6964006460804F514A0CA40013CC2ADB0004"
//   },
//   "operationType": "delete",
//   "clusterTime": "6953646404065558529",
//   "ns": {
//     "db": "tracks-db",
//     "coll": "tracks"
//   },
//   "documentKey": {
//     "_id": "60804f514a0ca40013cc2adb"
//   }
// }
