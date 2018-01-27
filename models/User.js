const mongoose = require('mongoose');
const { Schema } = mongoose;
const activitySchema = require('./Activity');

const userSchema = new Schema({
  profile: {
    spotifyID: String,
    userName: String
  },
  accessToken: String,
  refreshToken: String,
  activities: [activitySchema]
});

mongoose.model('users', userSchema);
