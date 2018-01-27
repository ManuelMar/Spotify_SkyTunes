const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
  name: String,
  playListId: String,
  createdOn: Date,
  lastModified: Date
});

module.exports = activitySchema;
