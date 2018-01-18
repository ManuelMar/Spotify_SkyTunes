const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  profile: {
    spotifyID: String,
    userName: String
  },
  accessToken: String,
  refreshToken: String
});

mongoose.model('users', userSchema);
