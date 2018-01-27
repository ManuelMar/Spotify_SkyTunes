const mongoose = require('mongoose');
const Activity = mongoose.model('activity');

module.exports = app => {
  app.get('/api/activities', async (req, res) => {
    if (req.user) {
      const existingActivities = await Activity.find({
        _user: req.user._id
      });
      console.log(req.user._id);
      res.send(existingActivities);
    } else {
      res.send({ error: 'please login' });
    }
  });
};
