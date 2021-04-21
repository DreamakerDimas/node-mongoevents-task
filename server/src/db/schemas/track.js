const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackScheme = new Schema({
  title: { type: String, required: true },
});

module.exports = trackScheme;
