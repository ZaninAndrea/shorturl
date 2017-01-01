// server.js
// where your node app starts
// init project

var express = require('express');
var app = express();
var reference={};
var count=0;
app.get('/new/*', function (req, res) {//creating new url
  var link=req.path.substring(5);
  if (link.toLowerCase().startsWith("http")){
    var num=count.toString();
    reference[num]=link;
    count++;
    res.send(JSON.stringify({ "original_url":link, "short_url":"https://power-church.gomix.me/"+num }));
  }else{
    res.send(JSON.stringify({"error":"Wrong url format, make sure you have a valid protocol and real site."}));
  }
})
app.get('/', function (req, res) {//home
  res.sendFile(__dirname + '/views/index.html');
})
app.get('/*', function (req, res) {//using shortned url
  if(reference.hasOwnProperty(req.path.substring(1))){
    res.redirect(reference[req.path.substring(1)]);
  }else{
    res.send("url not found");
  }
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})