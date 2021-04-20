const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackScheme = new Schema({
  title: String,
});

module.exports = trackScheme;
