const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    userID: String,
    episodeID: String,
    reviewTitle: String,
    reviewContent: String,
    // reviewScore: String
});

module.exports = mongoose.model('Review', ReviewSchema);