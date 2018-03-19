var express = require('express');
var router = express.Router();
var classes = require('../controllers/classes');
var fs = require('fs');

var conversion = require("phantom-html-to-pdf")();
// var classes = require('../controllers/students');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var data = [{id: 1, name: 'Rahul'}, {id: 2, name: 'Sahi'}, {id: 3, name: 'Sahi'}, {id: 4, name: 'Sahi'}, {
        id: 5,
        name: 'Sahi'
    }, {id: 6, name: 'Sahi'}, {id: 7, name: 'Sahi'}]

    var head = '<head><title>busy</title> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">'

        + '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></head> <style> .heading{color:blue !important} .headimage{height:150px;width:100%}'

        + '.table-space{  margin-top:50px } </style>'


    var tablehead = '<h3 class="text-center heading">Grid model</h3> <img src="https://www.bmw-me.com/content/dam/bmw/common/all-models/4-series/gran-coupe/2017/images-and-videos/images/BMW-4-series-gran-coupe-images-and-videos-1920x1200-11.jpg.asset.1510606104328.jpg" class="headimage">'

    var table;


    if (data.length > 0) {

        //create table

        table = '<table class="table table-bordered table-space"><thead><tr>'

        Object.keys(data[0]).forEach(function (key) {

            table += '<th>' + [key] + '</th>';

        })

        table += '</tr></thead><tbody>';

        for (var i = 0; i < data.length; i++) {

            //create table body

            var tbody = '<tr>';

            Object.keys(data[0]).forEach(function (key) {

                tbody += '<td>' + data[i][key] + '</td>';

            })

            table += tbody

        }

        table += '</tr></tbody></table>';


    }


    var content = head + tablehead + table;
    // var filename='test'
    // res.header('Content-disposition', 'inline; filename=' + filename);
    // res.header('Content-type', 'application/pdf');

    // function dispatchPDF() {

    conversion({ html: content }, function (err, pdf) {
        var output = fs.createWriteStream('ggggg.pdf')

        // since pdf.stream is a node.js stream you can use it
        // to save the pdf to a file (like in this example) or to
        // respond an http request.
        pdf.stream.pipe(output);
        res.send({
            success:true
        })
    });
    // }

});

/*router.post('/',function (req,res,next) {
    classes.create(req,res,next)
});

router.get('/:id',function (req,res,next) {
    classes.read(req,res,next)
});
router.put('/:id',function (req,res,next) {
    classes.update(req,res,next)
});

router.param('id',classes.classById)*/
module.exports = router;
