var express = require('express');
var router = express.Router();
var fs = require('fs')
// var passport = require('passport');
const credentials = {
    client: {
        id: '548197471767-hstvplgd5eiqri2jc68gckpo7rj18o5f.apps.googleusercontent.com',
        secret: '6Mdd2xiHwzh-j6mlnmgWcK5H'
    },
    auth: {
        tokenHost: 'https://oauth.voltuswave.com/'
    }
};
const oauth2 = require('simple-oauth2').create(credentials);

const authorizationUri = oauth2.authorizationCode.authorizeURL(
    // console.log('Called this method'),
    {
    redirect_uri: 'https://oauth.voltuswave.com/google/callback',
    scope: 'notifications'
});

// router.get('/', function(req, res,next) {
//     // console.log(authorizationUri);
//     res.redirect(authorizationUri);
//     // res.send({data:true})
// });

// Callback service parsing the authorization token and asking for the access token
router.post('/', (req, res,next) => {
    console.log(req.body.code26)
    const code = JSON.parse(req.body.code26);
    
    const options = {
        code,
    };
    console.log(options)
    oauth2.authorizationCode.getToken(options, (error, result) => {
        console.log(result)
        if (error) {
            console.error('Access Token Error', error.message);
            return res.json('Authentication failed');
        }

        console.log('The resulting token: ', result);
        const token = oauth2.accessToken.create(result);

        return res
            .status(200)
            .json(token);
    });
});

module.exports = router;
