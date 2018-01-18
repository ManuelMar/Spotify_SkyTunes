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
      const existingUser = await User.findOne({
        profile: { spotifyID: profile.id, userName: profile.username }
      });
      console.log('the existing user is :::');
      console.log(existingUser);
      if (existingUser) {
        const userdb = await User.findOneAndUpdate(
          { profile: { spotifyID: profile.id, userName: profile.username } },
          { $set: { accessToken: accessToken, refreshToken: refreshToken } }
        );

        return done(null, userdb);
      }

      const user = await new User({
        profile: {
          spotifyID: profile.id,
          userName: profile.username
        },
        accessToken: accessToken,
        refreshToken: refreshToken
      }).save();
      done(null, user);
    }
  )
);

/*
const userf = {
  accessToken: accessToken,
  refreshToken: refreshToken
};
*/

/*
const userf = {
  profile: user,
  accessToken: accessToken,
  refreshToken: refreshToken
};
*/
