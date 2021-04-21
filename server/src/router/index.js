const router = require('express').Router();
const {
  createTrack,
  updateTrack,
  deleteTrack,
} = require('../db/queries/tracksQueries');

router.get('/test', (req, res) => {
  createTrack({ title: '54321' });
  // updateTrack({ title: '54321' }, { title: '543210' });
  // deleteTrack({ title: '54321' });
});

module.exports = router;
