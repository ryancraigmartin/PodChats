const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// Podcasts recieves their ID from it's MongoDB ID.
const PodcastSchema = new Schema({
 imageUrl: String,
 feedUrl: String,
 title:  String,
 creator: String,
 podcastID: { default: Schema.Types.ObjectId }
 // user_Id: String
});

module.exports = mongoose.model('Podcast', PodcastSchema);