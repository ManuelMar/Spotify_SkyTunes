const passport = require('passport');
const Spotify = require('spotify-web-api-node');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

const spotifyApi = new Spotify({
  clientId: keys.spotifyClientId,
  clientSecret: keys.spotifyClientSecret,
  callbackUri: '/auth/spotify/callback'
});

module.exports = app => {
  app.get(
    '/auth/spotify',
    passport.authenticate('spotify', {
      scope: [
        'user-read-email',
        'user-read-private',
        'user-read-recently-played',
        'user-read-playback-state',
        'user-read-currently-playing'
      ]
    }),
    (req, res) => {
      // The request will be redirected to spotify for authentication, so this
      // function will not be called.
      console.log('attempting to auth');
    }
  );

  app.get('/db/current_user', (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    if (req.user) {
      spotifyApi.setAccessToken(req.user.accessToken);
      spotifyApi.setRefreshToken(req.user.refreshToken);
      res.send(req.user.profile);
    } else {
      res.send(req.user);
    }

    /*spotifyApi.getMe().then(body => {
      console.log('current_user!!!!!!!!!!!!!!!!!');
      console.log(body);
      res.send(body);
    });
    */
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get(
    '/auth/spotify/callback',
    passport.authenticate('spotify'),
    (req, res) => {
      // Successful authentication, redirect home.
      console.log('successful authentication!');
      console.log(req.user);
      spotifyApi.setAccessToken(req.user.accessToken);
      spotifyApi.setRefreshToken(req.user.refreshToken);
      //TODO: Save only refresh token and use it to get new access tokens every 30 min or so
      //res.redirect(`/user/${req.user.accessToken}/${req.user.refreshToken}`);
      res.redirect('/music');
    }
  );
};
