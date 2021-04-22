const router = require('express').Router();
const {
  createTrack,
  updateTrack,
  deleteTrack,
  getTracksArrAndCount,
} = require('../db/queries/tracksQueries');

router.post('/test', async (req, res) => {
  console.log('router', req.body);
  return res.send('success');
});

router.put('/test', async (req, res) => {
  console.log('router', req.body);
  return res.send('success');
});

router.delete('/test/:id', async (req, res) => {
  console.log('router', req.params.id);
  return res.send('success');
});

router.get('/test', async (req, res) => {
  // createTrack({ title: '12345' });
  // updateTrack({ title: '54321' }, { title: '543210' });
  // deleteTrack({ title: '54321' });
});

module.exports = router;
