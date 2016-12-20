var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;




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

app.get('/itineraries', function(req, res){
 var url = 'mongodb://localhost:27017/premier_planner';
 MongoClient.connect(url, function(err, db){
  var collection = db.collection('planners');
  collection.find({}).toArray(function(err, docs){
    res.json(docs);
    db.close();
  })
})
});

app.use(express.static('client/build'));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

// var fs = require('fs');
// var ACCOUNTS_FILE = path.join(__dirname + '/sample.json');
//...

