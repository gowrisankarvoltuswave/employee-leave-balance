var express = require('express');
var router = express.Router();
// var GoogleOAuth2 = require('google-oauth2-token')
// var Nightmare = require('nightmare')
// var NightmareOAuth2 = require('nightmare-google-oauth2')
var headlessAuth = require('headless-google-auth'),
    gmail = require('googleapis').gmail('v1');
let google = require('googleapis');
// let privatekey = require("../privatekey.json");
// let drive = google.drive('v3');
var fs = require('fs');
var readline = require('readline');

// var fileMetadata = {                                             // creating folder Method 1
//     'name': 'Invoices',
//     'mimeType': 'application/vnd.google-apps.folder'
//   };
//   drive.files.create({
//     resource: fileMetadata,
//     fields: 'id'
//   }, function (err, file) {
//     if (err) {
//       // Handle error
//       console.error(err);
//     } else {
//       console.log('Folder Id: ', file.id);
//     }
//   });

//creating the folder in drive                                  // creating folder Method 2
// function createFolder(name,folderId,next) {
//     var folderIds=[];
//     if(folderId !== null){
//       folderIds.push(folderId);
//     }
//     var fileMetadata = {
//       'name' : name,
//       'mimeType' : 'application/vnd.google-apps.folder',
//        parents: folderIds
//     };
//     drive.files.create({
//       resource: fileMetadata,
//       fields: 'id'
//     }, function(err, file) {
//       if(err) {
//         console.log("error creating folder: ",err);
//         next(err);
//       } else {
//         console.log('Folder Id: ', file.id);
//         next(err,file.id);
//       }
//     });
//   }
//   return {
//     getTokens:getTokens
//   };

function insertTest(drive) { //Need to figure out how to specify owner because the service accont owns this file right now which isn't very useful
    drive.files.insert({
        resource: {
            title: 'test.txt',
            mimeType: '',
            // parents: [{ id: '1YYDO_7LWw1MK1XdpDc0oQ1iavCqKFfZq' }]
        },
        media: {
            mimeType: '',
            // body: fs.createReadStream('../../Downloads/icon-fb.png') // read streams are awesome!
            body: 'Test Paragraph'
        }
    },
        function (err, resp) {
            if (err) {
                console.log('insert error: ', err);
            } else {
                console.log('File created. See id following:');
                console.dir(resp);
            }
        }
    );
}
function download(fileId, drive) {
    drive.files.get({
        fileId: fileId
    }, (err, metadata) => {
        if (err) {
            throw err;
        }
        console.log('Downloading %s...', metadata.originalFilename);
        const dest = fs.createWriteStream(metadata.originalFilename);

        drive.files.get({
            fileId: fileId,
            alt: 'media'
        })
            .on('error', err => {
                console.error('Error downloading file');
                throw err;
            })
            .pipe(dest);

        dest
            .on('finish', () => {
                console.log('Downloaded %s!', metadata.originalFilename);
                process.exit();
            })
            .on('error', err => {
                console.error('Error writing file!');
                throw err;
            });
    });
}

const client_email = 'voltuswavedrive@learned-sprite-196808.iam.gserviceaccount.com'
const private_key = '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDHxRGqxf9NQXdY\na7YMVEs7djuw9pJUvgr7vR3EaFxbvdYg//O2h6cnzHUXBnuun+vwrzple22phDHy\nLVy+2qMKq9gaN/VhQsnZiI8XRc5ABBltcwtBVXZLNePdBy7MMnZb+JLgHO9JslKg\nctvq3QkrNY4u32/60bSAE2+v7SXQxudrpZWY1N7DE7XzI441cy4HuljBRdrQ+Bp4\nxJABHsAFCK97FqML1tAUlYoeUTNCcqIx8NetkznBAHvkHn3AO7u+zENMRW84uiTF\nUr9PVQTt7+S7yAOiC3P2xxsOpHz7vrfhGNO1xEY7lyitrBG6Ltx4rIE8aF+qC6H4\n+Dq6VTvbAgMBAAECggEABTV4FfYEB6gpgVE3AHr22+M5KuPrAdxTXf1a4thTxtfx\ngY/FnjX1n6iJnw2TY69req2e/gQUt8L+KGc9ZVk/FL6mq7Gs1hnkjdBX5s6c/PdT\nuxJbsfBACDWsri0176twgZ++zgAtzxlKupX0HQYhaz0swBUhuYOxS1ZLvGXDGClO\nYqmBCYiUqS/gyGf/TaIkPIFaQf2n4wuFDc+eGNuOE/v+vQWuYle8MtUfUZZrOqvH\n3bQVvsY+b3urUCr9Of+qyMRx7lzgLyC5xbumwc3GM0iZDcgVRYPk/usH/niFt8Ol\nZB4RUMshUY2+QWkj7iaSbqZwLfGGnWJGGwxeQ+CbZQKBgQD0r9visotLicGwlMbO\n4HYzQnBUgDOsXJ8fcfv5ulQ9pEa7DNA6BZLM5NPGsLhV4bCZrz2FCDZppV35Plbo\n2XLoMvCEa2cByfIj1whpq3fLRIbRhdQai3o+NJDAPzKjdYkknc7++YlDi7VubrBV\nq6bCrGQrc5NYCJaQ1+oxwLEn/wKBgQDRAZDdtu4JgjJwyiIqU5kmnjNOVWh9f79C\nySk6ZZqnmYywY7m6V7gop2HDOM2zPjNIrnPJRDZnuz3RmMaZRdRrUD/p5xCht0C3\nIXY69KgqvzzuM2kUKzDuOkGA9isJS63TBHMJ6eF1Ftd+f7Eaaxa7dZyttzLgfnGF\n4fBZySWMJQKBgCOSza0PuCCrTnWVq7G4AHdDWYFvghO1A41WzQNpi4XKtF3NZxiI\nZudS/VcNqj8SKNKvH4qPvxls6VSrM4d21bXccgtOchNYgNOlF5wFSc1LkS40/rk9\nPfB9Q+4vQfVxyRaBuu5m6QXg8ee0P/60jfIPjiCjFPDfjsRQH8RL93WRAoGAcOK8\noNO9y4rzvXGfdGcEsBQAOA3vSuFlpyfJSc448s7/awHh/aCFSgflyLB0gZxVzKrU\nxN8/11UNdZhjo8NQkMmeS7JOjFnS7VZ4ai1cawIxYaKI3ajaW8FBQeszoWirsO6V\nR8R3zmsQ5zUGrfMrKwLCJh1tsEz6+cnnrEb1LbUCgYA9Fo0KgoIAdvowln6Klt+Q\njWH0TIV6Vk78+w5q3lF+59Xm3C1CfnRWG/jIoeOiaYK2oCmaaHzBwVa+U124MnQq\n1gJhw1Kbd+2bWCwu4JzyN5j7O7wuNelmLakCQ3XRgqb+je0pA5vE5MShgA26bAsk\nEjltEDQYVtmq/+G7mZ2CUA==\n-----END PRIVATE KEY-----\n'
const driveMailId = 'sankar@voltuswave.com'
const folderId = '1YYDO_7LWw1MK1XdpDc0oQ1iavCqKFfZq'
router.get('/callback', function (req, res, next) {
    // console.log(privatekey.client_email)
    let jwtClient = new google.auth.JWT(
        client_email,
        null,
        private_key,
        ['https://www.googleapis.com/auth/drive'], driveMailId
    );
    //authenticate request
    jwtClient.authorize(function (err, tokens) {
        if (err) {
            console.log(err);
            return;
        } else if (tokens) {
            console.log(tokens)
            console.log("Successfully connected!");
            var drive = google.drive({
                version: 'v2',
                auth: jwtClient
            });

            // insertTest(drive);
            // download('0B-995VP6S8U7RnN6ckhQbW9TSzA',drive);
            // file upload end 
            drive.files.list({
                q: "trashed=false",
            }, (err, metadata) => {
                if (err) {
                    console.log(err)
                }
                else {
                    let items = []
                    for (let meta of metadata.items) {
                        if (meta.parents[0].id == folderId) {
                            items.push(meta)
                            console.log(items)
                        }
                    }
                }
            })


        }
    });
})
let request = require('request');
const http = require('https');
var stream = require('file-stream')
var filepath = 'http://voltuswave.com/wp-content/uploads/2016/10/voltu-wave-application-2.png'
router.get('/download', function (req, res, next) {
    // var file = fs.readFileSync(__dirname + 'https://www.gettyimages.no/gi-resources/images/Embed/new/embed2.jpg', 'binary');
    var file = 'http://voltuswave.com/wp-content/uploads/2016/10/voltu-wave-application-2.png';//'https://www.gettyimages.no/gi-resources/images/Embed/new/embed2.jpg';

    if (!stream(filepath, req, res)) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain')
        res.end('unable to stream ' + filepath + '\n')
    }

    // var filename = 'embed2.png';
    // var mimetype = 'image/png';

    // res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    // res.setHeader('Content-type', mimetype);

    //  var filestream = fs.createReadStream(file);
    // filestream.pipe(res);


    // var filestream = fs.createReadStream(__dirname + "/images/next.png");
    // request('http://fromrussiawithlove.com/baby.mp3').pipe(fs.createWriteStream('song.mp3'));

    // http.get(file, function (res) {
    //     res.pipe(fs.createWriteStream(filename));
    //   });


    // fs.readFile(file, (err, data) => {
    //     if (err) throw err;
    //     res.pipe(data);
    //   });

    //filestream.pipe(res);

    //res.pipe(fs.createWriteStream(__dirname + "/images/next.png"))


    // console.log(__dirname)
    // var file = __dirname + '/images/next.png';

    // var filename = 'next.png';
    // var mimetype = 'image/png';

    // res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    // res.setHeader('Content-type', mimetype);

    // var filestream = fs.createReadStream(file);
    // filestream.pipe(res);
})
router.get('/createFolder', function (req, res, next) {
    let jwtClient = new google.auth.JWT(
        client_email,
        null,
        private_key,
        ['https://www.googleapis.com/auth/drive'], driveMailId
    );
    //authenticate request
    jwtClient.authorize(function (err, tokens) {
        if (err) {
            console.log(err);
            return;
        } else if (tokens) {
            console.log(tokens)
            console.log("Successfully connected!");
            var drive = google.drive({
                version: 'v2',
                auth: jwtClient
            });

            var fileMetadata = {
                'title': 'Mine426655',
                'mimeType': 'application/vnd.google-apps.folder'
            };
            // drive.files.insert({
            //     resource: fileMetadata,
            //     fields: 'id'
            // }, function (err, file) {
            //     if (err) {
            //         // Handle error
            //         console.error(err);
            //     } else {
            //         console.log('Folder Id: ', file.id);
            //     }
            // });
            drive.files.list({
                resource: {
                    q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
                    fields: 'nextPageToken, items(id, title)'
                    // parents: [{ id: '1YYDO_7LWw1MK1XdpDc0oQ1iavCqKFfZq' }]
                },
            }, function (err, res) {
                if (err) {
                    // Handle error
                    console.error(err);
                } else {
                    res.items.forEach(function (file) {
                        console.log('Found file:', file.title, file.id, );
                        function isEmptyObject(file) {
                            return Object.getOwnPropertyNames(file).title =='entity_25_instance_581188';
                        }
                    });

                    console.log(isEmptyObjec())

                }

            });


        }
    });
})
module.exports = router;
