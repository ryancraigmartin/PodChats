const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);
// mongoose.connect(process.env.MONGO);

module.exports = mongoose;