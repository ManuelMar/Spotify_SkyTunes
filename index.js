const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

require('./models/User');
require('./services/passport');

mongoose.Promise = global.Promise; //set promise module
mongoose.connect(keys.mongoURI);

const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
  console.log('Server Running');
});

app.use(bodyParser.json()); // bodyParser required by passport
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // cookie expiry
    keys: [keys.cookieKey] // cookie key: keep secret
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/spotifyRoutes')(app);

PORT = process.env.PORT || 5000;
app.listen(PORT);

/*
TODO: Implement Activity based playlists:
  1. ask user what theyre doing (log and display)
  2. collect data on their tracks
  3. suggest playlist


  4. activity miner search 1000 playlists with activity
*/
