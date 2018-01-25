const passport = require('passport');
const Spotify = require('spotify-web-api-node');
const _ = require('lodash');
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
    //console.log(req.user);
    res.send(req.user);
  });

  app.get('/api/search', async (req, res) => {
    console.log('api/search');
    const activity = 'gym cardio';
    spotifyApi.setAccessToken(req.user.accessToken);
    spotifyApi.setRefreshToken(req.user.refreshToken);
    const search = await spotifyApi.searchPlaylists(activity);
    const vals = _.chain(search.body.playlists.items)
      .map(item => {
        //console.log(item.id);
        //console.log(item.owner.id);
        return {
          plId: item.id,
          ownerId: item.owner.id
        };
      })
      .compact()
      .value();

    /*
    const trackLists = _.chain(vals)
      .each(({ plId, ownerId }) => {
        console.log(plId, ownerId);
        try {
          var tL = spotifyApi.getPlaylistTracks(ownerId, plId);
          console.log('tl = ');
          console.log(tL);
        } catch (err) {
          console.log('i died!!!!!!!!!');
        }
        if (tL) {
          return tL;
        }
      })
      .value();*/

    const trackLists = await Promise.all(
      _.chain(vals)
        .map(async ({ plId, ownerId }) => {
          var tracks = await spotifyApi.getPlaylistTracks(ownerId, plId);
          return tracks.body.items[0].track.uri;
        })
        .compact()
        .value()
    );

    const trackList = await spotifyApi.getPlaylistTracks(
      vals[0].ownerId,
      vals[0].plId
    );
    console.log('vals =');
    console.log(vals);

    console.log('track list =');
    console.log(trackLists);

    res.send(search);
  });

  app.get('/api/current_user', (req, res) => {
    if (req.user) {
      spotifyApi.setAccessToken(req.user.accessToken);
      spotifyApi.setRefreshToken(req.user.refreshToken);
      res.send(req.user.profile);
    } else {
      res.send(req.user);
    }
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
      spotifyApi.setAccessToken(req.user.accessToken);
      spotifyApi.setRefreshToken(req.user.refreshToken);
      //TODO: Save only refresh token and use it to get new access tokens every 30 min or so
      //res.redirect(`/user/${req.user.accessToken}/${req.user.refreshToken}`);
      res.redirect('/music');
    }
  );
};
