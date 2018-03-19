var express = require('express');
var router = express.Router();
var users = require('../controllers/users');
var fs = require('fs')
// var classes = require('../controllers/students');

/* GET users listing. */

router.post('/',function (req,res,next) {
    users.create(req,res,next)
});

router.get('/',function (req,res,next) {
    users.list(req,res,next)
});
/*router.put('/:id',function (req,res,next) {
    classes.update(req,res,next)
});

router.param('id',classes.classById)*/
module.exports = router;
