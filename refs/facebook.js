var express = require('express');
var router = express.Router();
var users = require('../controllers/users');
var passportService = require('../config/passport')
var passport = require('passport');
var fs = require('fs')





// router.get('/', passport.authenticate('facebook', {
//     scope: ['public_profile', 'email']
// }));

// router.post('/', function (req, res, next) {
//     console.log('facebook route')
//     users.facebookauthincate(req, res, next)
// });

router.get('/', passport.authenticate('facebook', { 
    scope : ['public_profile', 'email']
    
  }));
  

  // handle the callback after facebook has authenticated the user
  router.get('/callback',
      passport.authenticate('facebook', {
          successRedirect : '/vehicles',
          failureRedirect : '/'
      }));
/*router.put('/:id',function (req,res,next) {
    classes.update(req,res,next)
});

router.param('id',classes.classById)*/
module.exports = router;
