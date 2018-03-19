
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.post('/test', (req, res) => {
  var obj = req.body.parameters
  var leaveId = obj.LeaveBalance;
  if (leaveId == '4 leaves For this Month') {
    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
    res.send(JSON.stringify({ "speech": 'You are awesome Man !', "displayText": 'You are awesome Man !' }))
  }
  else {
    res.send('You Better Try Again !')

  }
})
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
