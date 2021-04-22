const Tracks = require('../models/track');
const { sendDeleteEvent, titleIsMatches } = require('../../functions/events');
const { titleRegex } = require('../../constants');

module.exports.getTrack = async (id) => {
  try {
    return await Tracks.findById(id);
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports.getTracksArrAndCount = async (limit, skip) => {
  try {
    const tracksArr = await Tracks.find(
      { title: { $regex: titleRegex } },
      null,
      {
        limit,
        skip,
      }
    ).exec();

    const count = await Tracks.countDocuments({
      title: { $regex: titleRegex },
    });
    const haveMore = count > limit;

    return { tracksArr, haveMore };
  } catch (err) {
    console.log(err);
    return false;
  }
};

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
    const trackData = await Tracks.findOne(track);

    await Tracks.findOneAndRemove(track);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
