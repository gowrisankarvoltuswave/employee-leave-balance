var express = require('express');
var router = express.Router();
// var passport = require('passport');
const credentials = {
    client: {
        id: '141985076589731',
        secret: 'e23680e09ca7d2ecf7c1e5094feea271'
    },
    auth: {
        tokenHost: 'http://192.168.1.231:3001/'
    }
};
const oauth2 = require('simple-oauth2').create(credentials);

const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: 'http://192.168.1.231:3001/sociallogin/callback',
    scope: 'notifications'
});

router.get('/', function(req, res,next) {
    // console.log(authorizationUri);
    res.redirect(authorizationUri);
    // res.send({data:true})
});

// Callback service parsing the authorization token and asking for the access token
router.get('/callback', (req, res) => {
    const code = req.query.code;
    const options = {
        code,
    };
    oauth2.authorizationCode.getToken(options, (error, result) => {
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
