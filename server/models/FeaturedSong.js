const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const featuredSongSchema = new Schema(
  {
    today: {
      type: String,
      default: (new Date()).toLocaleDateString()
    },
    songList: [String],
  }
);


const FeaturedSong = model('FeaturedSong', featuredSongSchema);

module.exports = FeaturedSong;
