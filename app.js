var express = require('express');
var redirect = require("express-redirect");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var validate = require('./middleware/jwt');
var cors = require('cors');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var sessionstore = require('sessionstore');
var flash = require('connect-flash');
var RedisStore = require('connect-redis')(session);
var localStorage = require('localStorage')
const debug = require('debug')
const inspector = require('inspector');
// var config = require('./config'); // get our config file


var index = require('./routes/index');
var classes = require('./routes/classes');
var users = require('./routes/users');
var vehicles = require('./routes/vehicles');
var googlepassport = require('./routes/googlepassport')
var googlecallbackuri = require('./routes/googlecalbackurl')
var twitterLogin = require('./routes/twitterLogin')
var twitterCallbackUri = require('./routes/twitterCallbackUrl')
var linkedinLogin = require('./routes/linkedinLogin')
var linkedinCallbackUri = require('./routes/linkedinCallbackUrl')
var storegooglecode = require('./routes/googlecode')
var googleDrive = require('./routes/googleDrive')
var refreshToken = require('./routes/refreshToken')
var chatBots = require('./routes/chatbots')
var testApI=require('./routes/testAPI')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('superSecret', 'ilovescotchyscotch'); // secret variable
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
// app.use(bodyParser());
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
// app.use(session({ secret: 'twittersecretkey' }));
app.use(passport.initialize());         //middleware
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/googleloginapi/:clientId', googlepassport)
app.use('/google/callback', googlecallbackuri)
app.use('/twitterLogin/:clientId', twitterLogin)
app.use('/twitter/callback', twitterCallbackUri)
app.use('/linkedinLogin/:clientId', linkedinLogin)
app.use('/linkedin/callback', linkedinCallbackUri)
app.use('/storegooglecode', storegooglecode)
app.use('/googleDrive', googleDrive)
app.use('/refreshToken', refreshToken)
app.use('/chatBots',chatBots)
app.use('/testAPI',testApI)

// app.use(function (req, res, next) {
//     var token = localStorage.getItem('token');
//     if (req.originalUrl == '/login') {
//         console.log('kk')
//         next()
//     } else {
//         validate.checkValidate(token, req, res, next)
//     }
// });

app.use('/classes', classes);
app.use('/vehicles', vehicles);


// app.use(function isLoggedIn(req, res, next) {
//     // if user is authenticated in the session, carry on
//     if (req.isAuthenticated()) {
//         console.log('true')
//         return next();
//     }

//     else {
//         // if they aren't redirect them to the home page
//         res.redirect('/');
//     }

// })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

module.exports = app;
