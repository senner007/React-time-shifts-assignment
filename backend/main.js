// server.js

// init project
var express = require('express');
const cors = require('cors')
var bodyParser = require('body-parser')
var app = express();
app.use( bodyParser.json() );

app.use(cors())

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

let users = [{
    id: 0,
    userName: 'Benjamin',
    startDate: '2021-04-19',
    endDate: '2021-04-29'
  },
  {
    id: 1,
    userName: 'Niels',
    startDate: '2022-04-19',
    endDate: '2022-04-29'
  }
];

// http://expressjs.com/en/starter/basic-routing.html
app.get("/api", function(request, response) {
  response.json(users)
});


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});


app.post('/api', (req, res) => {
    const data = {...req.body, id : users[users.length -1].id +1}
    users = [...users, data]
    res.json('Shift post success')
  })

// listen for requests :)
app.listen(5000, function () {
  console.log('Your app is listening on port ' + 5000);
});
