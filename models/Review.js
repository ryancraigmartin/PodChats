const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    userID: String,
    episodeID: String,
    reviewTitle: String,
    reviewContent: String,
    // reviewScore: String
});

// GET, POST, PUT, DELETE
module.exports = mongoose.model('Review', ReviewSchema);