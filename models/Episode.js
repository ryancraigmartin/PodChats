const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
  imageUrl: String,
  title: String,
  publishedDate: String,
  description: String,
  podcastID: String,
  episodeScore: { type: Number, default: 0 }
});

// GET, POST

module.exports = mongoose.model("Episode", EpisodeSchema);

