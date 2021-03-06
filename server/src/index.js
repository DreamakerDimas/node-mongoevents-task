const express = require('express');
const http = require('http');
const { serverPort } = require('./constants');
const router = require('./router');

const Tracks = require('./db/models/track');
const {
  sendInsertEvent,
  sendUpdateEvent,
  sendDeleteEvent,
  titleIsMatches,
} = require('./functions/events');
const { getTrack, getTracksArr } = require('./db/queries/tracksQueries');

const app = express();
app.use(express.json());
app.use(router); // for test purposes

const server = http.createServer(app);
server.listen(serverPort, () =>
  console.log(`App listening on port ${serverPort}!`)
);

//
// initial synchronization
const initSync = async () => {
  let haveMore = true;
  const limit = 10;
  let offset = 0;

  while (haveMore) {
    const batch = await getTracksArr(limit, offset);
    haveMore = batch.haveMore;
    offset += limit;

    for (const track of batch.tracksArr) {
      const res = await sendInsertEvent(track);
      console.log('Init insert:', track._id, '| result:', res);
    }
  }
};
initSync();

//
// tracks collection changes watcher
const changesWatcher = async () => {
  const tracksEventEmitter = Tracks.watch();

  tracksEventEmitter.on('change', async (change) => {
    const type = change.operationType;
    const docId = change.documentKey._id;

    if (type === 'insert' || type === 'update') {
      let result = false; // always boolean

      const trackData = await getTrack(docId);

      if (!trackData) {
        console.log('error', docId);
        return;
      }
      if (!titleIsMatches(trackData.title)) return;

      switch (type) {
        case 'insert':
          result = await sendInsertEvent(trackData);
          break;
        case 'update':
          result = await sendUpdateEvent(trackData);
          break;
      }

      console.log(result ? 'success' : 'error', docId);
    }

    // don't have title checker, - cause field title didn't exist in change event
    if (type === 'delete') {
      const result = await sendDeleteEvent(docId);

      console.log(result ? 'success' : 'error', docId);
    }
  });
};
changesWatcher();
