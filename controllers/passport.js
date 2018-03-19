// config/passport.js

// load all the things we need
var models = require('../models');
var db = models.sequelize.models;
// load up the user model
var User       = db.users;

// load the auth variables
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: '548197471767-67uqg1qjgv8577elfaql2kc0mka54qd7.apps.googleusercontent.com',
    clientSecret: 'h4mTq61LII3BF_hbMC4xHgwL',
    callbackURL: "https://oauth.voltuswave.com/googlepassport/callback"
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));
    