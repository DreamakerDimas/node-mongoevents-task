const Tracks = require('../models/track');

module.exports.createTrack = async (trackData) => {
  try {
    const newTrack = new Tracks(trackData);
    await newTrack.save();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports.updateTrack = async (track, updateData) => {
  try {
    await Tracks.findOneAndUpdate(track, updateData);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports.deleteTrack = async (track) => {
  try {
    await Tracks.findOneAndRemove(track);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
