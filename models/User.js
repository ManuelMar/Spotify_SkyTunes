const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  spotifyID: String,
  userName: String
});

mongoose.model('users', userSchema);
