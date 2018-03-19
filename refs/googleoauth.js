var express = require('express');
var router = express.Router();
var Session = require('express-session');
var google = require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;
const ClientId = "548197471767-67uqg1qjgv8577elfaql2kc0mka54qd7.apps.googleusercontent.com";
const ClientSecret = "h4mTq61LII3BF_hbMC4xHgwL";
const RedirectionUrl = "https://oauth.voltuswave.com/googlelogin/callback";
var models = require('../models');
var db = models.sequelize.models;




function getOAuthClient() {
    return new OAuth2(ClientId, ClientSecret, RedirectionUrl);
}
function getAuthUrl() {
    var oauth2Client = getOAuthClient();
    // generate a url that asks permissions for Google+ and Google Profile scopes
    var scopes = [
        'https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'
    ];

    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes, // If you only need one scope you can pass it as string
        prompt: 'consent',

    });

    return url;
}
router.get("/", function (req, res) {
    var url = getAuthUrl();
    res.send({url:url})
    // res.header('application/octet-stream; charset=utf-8')
    // res.redirect(getAuthUrl())
});


router.get("/callback", function (req, res) {
    var oauth2Client = getOAuthClient();
    var session = req.session;
    var code = req.query.code;
    oauth2Client.getToken(code, function (err, tokens) {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if (!err) {
            // oauth2Client.setCredentials(tokens);         version 22
            oauth2Client.credentials = tokens               //version 23
            // session.tokens=tokens;
            // res.redirect('https://oauth.voltuswave.com/googlelogin/details');
            // res.json({
            //     success: true,
            //     message: 'Enjoy your token!',
            // });
            plus.people.get({
                userId: 'me',
                auth: oauth2Client
            }, function (err, response) {

                // db.users.find({
                //     where: {
                //         $or: [{
                //             userId: response.data.emails[0].value
                //         }]
                //     },
                // }).then(function(users){
                //     if(!users){

                //     }
                //     else{
                        
                //     }
                // })
                res.send(response)

            });

        }
        else {
            res.send(`
            &lt;h3&gt;Login failed!!&lt;/h3&gt;
        `);
        }
    });
});

// var passport = require('passport');


module.exports = router;
