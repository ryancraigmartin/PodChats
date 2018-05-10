const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    userID: {default: Schema.Types.ObjectId},
    username: String,
    password: String,
    name: String,
    email: String,
});

// GET, POST, PUT, DELETE

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);