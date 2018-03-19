const oauth2 = require('simple-oauth2').create(credentials);

const credentials = {
    client: {
        id: '141985076589731',
        secret: 'e23680e09ca7d2ecf7c1e5094feea271'
    },
    auth: {
        tokenHost: 'https://api.oauth.com'
    }
};
const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: 'http://192.168.1.231:3001/auth/oAuth2/callback',
    scope: 'notifications'
});