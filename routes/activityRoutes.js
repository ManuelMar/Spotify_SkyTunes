const mongoose = require('mongoose');
const Activity = mongoose.model('activity');

//TODO: FIX user.id storage. req.user.id is changing on each login

module.exports = app => {
  app.get('/api/activities', async (req, res) => {
    if (req.user) {
      const existingActivities = await Activity.findOne({
        _user: req.user.id
      });
      res.send(existingActivities);
    } else {
      res.send({ error: 'please login' });
    }
  });
};
