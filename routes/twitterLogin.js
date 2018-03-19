var express = require('express');
var router = express.Router();
var app = express();
var passport = require('passport');
var models = require('../models');
var db = models.sequelize.models;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
// load up the user model
var User = db.users;
app.set('superSecret', 'ilovescotchyscotch'); // secret variable
var localStorage = require('localStorage')

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.

passport.use(new TwitterStrategy({
    consumerKey: 'BpzRvcHvFLIUB1jzm3wedTngM',
    consumerSecret: 'Zb3QteqG7x13jfJ2vaZ5QqnpBDUNW1QwW6KtsnBUuNrcUwBrJw',
    callbackURL: "https://oauth.voltuswave.com/twitter/callback",
    includeEmail: true,
    type: '1.0',
    popupOptions: { width: 495, height: 645 }
},
    function (req, token, tokenSecret, profile, done) {

        console.log(profile)
        process.nextTick(function () {
            // User.findOne({
            //     where: {
            //         googleId: profile.id
            //     }
            // }).then(function (user) {
            //     if (user) {
            return done(null, profile);

            //     }
            //     else if (!user) {
            //         User.create({
            //             googleId: profile.id,
            //             userId: profile.emails[0].value,
            //             userName: profile.displayName

            //         }).then(function (response) {
            //             return done(null, response);


            //         }).catch(function (response) {
            //             // failureRedirect: '/login'

            //         })
            //     }
            // })
        });
    }
));
// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /twitterLogin
router.get('/', function (req, res, next) {
    console.log('jkj')
    var logintype = req.originalUrl
    var clientId = logintype.split("/:")[1];
    console.log(clientId)
    passport.authenticate('twitter', {
        state: clientId


    })(req, res, next)
    // console.log(res)
});

module.exports = router