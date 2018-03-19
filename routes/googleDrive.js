
var googleDrive = require('google-drive')
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var drive = google.drive("v3");
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';
module.exports = function (req, res, next) {
    var GoogleTokenProvider = require('refresh-token').GoogleTokenProvider;

    const CLIENT_ID = '980818055652-40mtbld2vgtvmm07554lffh305c3qlrn.apps.googleusercontent.com';
    const CLIENT_SECRET = 'rgcvTKczEWWwCTMIfIjE11yq';
    const REFRESH_TOKEN = '1/vld04YaYDbS67jQqTYH34no5y9CSFK2kjVZC7z9ATQ0';
    const ENDPOINT_OF_GDRIVE = 'https://www.googleapis.com/drive/v2';
    const PARENT_FOLDER_ID = '1dm_go8DBC66GfZbgG7vkBsIM2vVOMJIq';
    
    const PNG_FILE = 'test.png';
    
    var async = require('async'),
        request = require('request'),
        fs = require('fs');
    
    async.waterfall([
      //-----------------------------
      // Obtain a new access token
      //-----------------------------
      function(callback) {
        var tokenProvider = new GoogleTokenProvider({
          'refresh_token': REFRESH_TOKEN,
          'client_id': CLIENT_ID,
          'client_secret': CLIENT_SECRET
        });
        tokenProvider.getToken(callback);
      },
    
      function(accessToken, callback) {
        console.log(accessToken)
        var fstatus = fs.statSync(PNG_FILE);
        fs.open(PNG_FILE, 'r', function(status, fileDescripter) {
          if (status) {
            callback(status.message);
            return;
          }
          
          var buffer = new Buffer(fstatus.size);
          fs.read(fileDescripter, buffer, 0, fstatus.size, 0, function(err, num) {
              
            request.post({
              'url': 'https://www.googleapis.com/upload/drive/v2/files',
              'qs': {
                 //request module adds "boundary" and "Content-Length" automatically.
                'uploadType': 'multipart'
    
              },
              'headers' : {
                'Authorization': 'Bearer ' + accessToken
              },
              'multipart':  [
                {
                  'Content-Type': 'application/json; charset=UTF-8',
                  'body': JSON.stringify({
                     'title': PNG_FILE,
                     'parents': [
                       {
                         'id': PARENT_FOLDER_ID
                       }
                     ]
                   })
                },
                {
                  'Content-Type': 'image/png',
                  'body': buffer
                }
              ]
            }, callback);
            
          });
        });
      },
    
      //----------------------------
      // Parse the response
      //----------------------------
      function(response, body, callback) {
        var body = JSON.parse(body);
        callback(null, body);
      },
    
    ], function(err, results) {
      if (!err) {
        console.log(results);
      } else {
        console.error('---error');
        console.error(err);
      }
    });
}