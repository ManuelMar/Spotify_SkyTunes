const passport = require('passport');
const Spotify = require('spotify-web-api-node');
const _ = require('lodash');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

const mongoose = require('mongoose');
const User = mongoose.model('users');
const Activity = mongoose.model('activity');

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
        'user-read-currently-playing',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-modify-playback-state'
      ]
    }),
    (req, res) => {
      console.log('attempting to auth');
    }
  );

  app.get('/db/current_user', (req, res) => {
    res.send(req.user);
  });

  /* ------------------------TODO: REFACTOR THIS MONSTER----------------------------*/
  // TODO: Extend search capability to more than 40 playlist search results
  // (api limits at) 50 per query
  // TODO: Handle deleting a playlist in spotify ... Hope for the best
  app.post('/api/search', requireLogin, async (req, res) => {
    console.log('api/search');
    //console.log(req.user._id);
    console.log(req.body.activity);
    const activity = req.body.activity;
    spotifyApi.setAccessToken(req.user.accessToken);
    spotifyApi.setRefreshToken(req.user.refreshToken);

    const existingActivity = await Activity.findOne({
      _user: req.user._id,
      name: activity
    });
    console.log(req.user._id);
    //console.log(existingActivity);

    if (existingActivity) {
      res.send(existingActivity.playListId);
      console.log('done existing playlist');
    } else {
      const search = await spotifyApi.searchPlaylists(activity, { limit: 40 });
      const vals = _.chain(search.body.playlists.items)
        .map(item => {
          return {
            plId: item.id,
            ownerId: item.owner.id
          };
        })
        .compact()
        .value();

      const trackLists = await Promise.all(
        _.chain(vals)
          .map(async ({ plId, ownerId }) => {
            var tracks = await spotifyApi.getPlaylistTracks(ownerId, plId);
            var uris = _.map(tracks.body.items, trackItem => {
              return { key: trackItem.track.uri, val: 1 };
            });
            return uris;
          })
          .compact()
          .value()
      );

      // flatten track lists
      const flatTrackLists = [].concat.apply([], trackLists);

      const acc = _.chain(flatTrackLists)
        .uniqBy('key')
        .map(item => {
          return {
            key: item.key,
            value: _.chain(flatTrackLists)
              .filter(track => {
                return track.key === item.key;
              })
              .sumBy('val')
              .value()
          };
        })
        .compact()
        .value();

      var vAcc = acc;
      vAcc.sort((a, b) => {
        return parseFloat(a.value) - parseFloat(b.value);
      });

      vAcc.reverse();
      vAcc = vAcc.slice(0, 20);

      const playList = _.map(vAcc, item => {
        return item.key;
      });

      //Creating the playlist and adding the playlist tracks
      const statusCreatePl = await spotifyApi.createPlaylist(
        req.user.profile.spotifyID,
        'Skytunes ' + activity,
        {
          public: false
        }
      );

      const statusAddTracks = await spotifyApi.addTracksToPlaylist(
        req.user.profile.spotifyID,
        statusCreatePl.body.id,
        playList
      );

      console.log(statusAddTracks);

      const newActivity = await new Activity({
        name: activity,
        playListId: statusCreatePl.body.id,
        createdOn: Date.now(),
        lastModified: Date.now(),
        _user: req.user._id
      }).save();
      //console.log('saved activity');
      //console.log(newActivity);
      console.log('Done new playlist');
      // probably want to return more than jsut the id, image and what not

      res.send(newActivity);
    }
  });

  /* ----------------------------END OF MONSTER-------------------------------*/
  /* ----------------------------!!!!!!!!!!!!!!-------------------------------*/

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
