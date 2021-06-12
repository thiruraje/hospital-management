
var express = require('express');

var app = express();
app.get('/',function (req, res) {
res.end('home')
});

app.listen(8000, function () {
  console.log('Listening to Port 8000');
});