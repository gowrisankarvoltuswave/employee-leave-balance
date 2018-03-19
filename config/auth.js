module.exports = {

    'facebookAuth' : {
        'clientID'      : '141985076589731', // your App ID
        'clientSecret'  : 'e23680e09ca7d2ecf7c1e5094feea271', // your App Secret
        'callbackURL'   : 'http://192.168.1.231:3001/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '548197471767-67uqg1qjgv8577elfaql2kc0mka54qd7.apps.googleusercontent.com',
        'clientSecret'  : 'h4mTq61LII3BF_hbMC4xHgwL',
        'callbackURL'   : 'https://oauth.voltuswave.com/googlepassport/callback'
    }

};
