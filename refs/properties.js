var express = require('express');
var router = express.Router();
var properties = require('../controllers/properties');
// var classes = require('../controllers/students');

/* GET users listing. */
router.get('/', function(req, res, next) {
    properties.list(req,res,next)
});

router.post('/',function (req,res,next) {
    properties.create(req,res,next)
});

router.get('/:id',function (req,res,next) {
    properties.read(req,res,next)
});
router.put('/:id',function (req,res,next) {
    properties.update(req,res,next)
});

module.exports = router;
