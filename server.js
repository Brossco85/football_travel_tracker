var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

var ACCOUNTS_FILE = path.join(__dirname + '/stadi_api.json');

app.get('/api/accounts', function(req,res) {
  fs.readFile(ACCOUNTS_FILE, function(err, data){
    if(err){
      console.error(err)
      return
    }
    res.json(JSON.parse(data))
  })
})

app.use(express.static('client/build'));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

// var fs = require('fs');
// var ACCOUNTS_FILE = path.join(__dirname + '/sample.json');
//...

