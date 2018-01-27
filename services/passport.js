const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // create token for cookie
  done(null, user.id); // not google profile.id, just DB _id !!!!
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
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
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
  //User.findById(id).then(user => {
  //  done(null, user);
  //});
});
*/
