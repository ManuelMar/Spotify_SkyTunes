const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
  name: String,
  playListId: String,
  createdOn: Date,
  lastModified: Date,
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('activity', activitySchema);
