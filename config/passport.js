var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var models = require('../models');
var db = models.sequelize.models;
var User = db.users;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: '548197471767-5p7poaa8dms4mgr0ktg9c1kbolifjuiq.apps.googleusercontent.com',
    clientSecret: 'RJ9C9bgvndgT7ErMzCJkwtfr',
    callbackURL: "https://oauth.voltuswave.com/googlepassport/callback"
},
    function (accessToken, refreshToken, params,profile, done) {
        console.log(params)
        process.nextTick(function () {
            User.findOne({
                where: {
                    googleId: profile.id
                }
            }).then(function (user) {
                if (user) {
                    return done(null, user);

                }
                else if (!user) {
                    User.create({
                        googleId: profile.id,
                        userId: profile.emails[0].value,
                        userName: profile.displayName

                    }).then(function (response) {
                        return done(null, response);


                    }).catch(function (response) {
                        // failureRedirect: '/login'

                    })
                }
            })
        });
    }
));