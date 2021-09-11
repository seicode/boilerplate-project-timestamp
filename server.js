// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", function (req, res) {
  const dateParam = req.params.date;
  var unixDate = new Number;
  var utcDate = new String;
  // console.log(isNaN(new Date(dateParam).getTime()));
  if (!dateParam) {
    unixDate = new Date().getTime();
  } else {
    unixDate = Number(req.params.date);
  }
  let tmp = new Date(unixDate);
  utcDate = new Date(tmp).toUTCString();
  console.log(JSON.stringify({unix: unixDate, utc: utcDate}));
  res.json({unix: unixDate, utc: utcDate});
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
