const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
//const Spotify = require('spotify-web-api-node');
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

//const spotifyApi = new Spotify();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
  //User.findById(id).then(user => {
  //  done(null, user);
  //});
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotifyClientId,
      clientSecret: keys.spotifyClientSecret,
      callbackURL: '/auth/spotify/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ spotifyID: profile.id });
      if (existingUser) {
        const userf = {
          profile: existingUser,
          accessToken: accessToken,
          refreshToken: refreshToken
        };
        return done(null, userf);
      }

      const user = await new User({
        spotifyID: profile.id,
        userName: profile.username
      }).save();

      const userf = {
        profile: user,
        accessToken: accessToken,
        refreshToken: refreshToken
      };
      done(null, userf);
    }
  )
);
