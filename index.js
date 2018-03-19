import { read } from 'fs';

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/test', (req, res) => {
      console.log(req)
      var leaveId = req.body.parameters.LeaveBalance;
      if(leaveId = '4 leaves For this Month'){
        res.send('You are awesome Man !')
      }
      else{
        res.send('You Better Try Again !')

      }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
