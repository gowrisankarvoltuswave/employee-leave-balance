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
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.

passport.use(new GoogleStrategy({
    clientID: '980818055652-40mtbld2vgtvmm07554lffh305c3qlrn.apps.googleusercontent.com',
    clientSecret: 'rgcvTKczEWWwCTMIfIjE11yq',
    callbackURL: "https://oauth.voltuswave.com/google/callback"
},
    function (accessToken, refreshToken, params, profile, done) {
        console.log('********** REfresh' + refreshToken)
        console.log('********** ACCESS' + accessToken)
        process.nextTick(function () {
         
            return done(null, profile);
        });
    }
));
// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
// var obj = { clientId: 1, clientName: 'user1' }
// var objString = JSON.stringify(obj)
router.get('/', function (req, res, next) {
    console.log('test' + req.originalUrl)
    var logintype = req.originalUrl
    var clientId= logintype.split("/:")[1];
    console.log(clientId)
    passport.authenticate('google', {
        display: 'popup',
        accessType: 'offline',
        type: 'code',
        state: clientId,
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
        approvalPrompt: 'force',
        // ux_mode: 'popup'


    })(req, res, next)
    // console.log(res)
});

module.exports = router