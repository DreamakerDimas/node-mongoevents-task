const router = require('express').Router();
const { createTrack } = require('../db/queries/tracksQueries');

router.post('/meta/tracks', async (req, res) => {
  const trackData = req.body;
  const result = await createTrack(trackData);
  res.send(result);
});

router.put('/meta/tracks', (req, res) => {
  //
});

router.delete('/meta/tracks', (req, res) => {
  //
});

router.get('/test', (req, res) => {
  createTrack({ title: '54321' });
});

module.exports = router;
