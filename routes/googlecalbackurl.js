
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





router.get('/',
    passport.authenticate('google'), // complete the authenticate using the google strategy
    (err, req, res, next) => { // custom error handler to catch any errors, such as TokenError
        console.log(res)
        console.log('****************************************************** CALLBACK K')
        if (err.name === 'TokenError') {
            console.log('failure')
            res.redirect('#!/login'); // redirect them back to the login page
        } else {
            // Handle other errors here
        }
    },
    (req, res) => { // On success, redirect back to '/'
        res.send(req.query.state)
        // console.log(req.user)
        // const payload = {
        //     userId: req.user.dataValues.userId,
        //     userName: req.user.dataValues.userName
        // };
        // var token = jwt.sign(payload, app.get('superSecret'), {
        //     expiresIn: 240 // expires in 24 hours
        // });
        // localStorage.setItem('token', token);
        // console.log('TokEn : ' + token)
        // res.redirect('https://oauth.voltuswave.com/#!/vehicles')
    }
);

module.exports = router