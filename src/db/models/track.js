const mongoose = require('mongoose');
const trackScheme = require('../schemas/track');

const Track = mongoose.model('Track', trackScheme);

module.exports = Track;
