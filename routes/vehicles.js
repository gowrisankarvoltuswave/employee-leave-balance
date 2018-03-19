var express = require('express');
var router = express.Router();
var vehicles = require('../controllers/vehicles');
var fs = require('fs');
var google = require('googleapis');
var googleAuth = require('google-auth-library')
var drive = google.drive("v3");

/* GET home page. */
// router.get('/', function (req, res, next) {
//     vehicles.list(req, res, next);
// });

router.get('/', function (req, res, next) {
    console.log('*****************************************************************************************************************')
    var fileId = '1XuBXF3SL3qy9sKmSfSz9aN7b2o2ipMYD';
    var dest = fs.createWriteStream('public/images/photo.jpg');
    drive.files.export({
        fileId: fileId,
        alt: 'media',
        mimeType: 'application/pdf'
    })
        .on('end', function () {
            console.log('Done');
        })
        .on('error', function (err) {
            console.log('Error during download', err);
        })
        .pipe(dest);
})

module.exports = router;
