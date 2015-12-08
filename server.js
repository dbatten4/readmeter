var express = require('express');
var app = express();
var root = __dirname;
var path = require('path');
//var bodyParser = require('body-parser');
//var methodOverride = require('method-override');

app.use(express.static(root + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
//app.use(bodyParser.urlencoded({'extended':'true'}));
//app.use(bodyParser.json());
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
//app.use(methodOverride('X-HTTP-Method-Override'));

require('./app/routes.js')(app);

var server = app.listen(process.env.port || 3000, function() {
  console.log('READMEter listening at http:localhost/3000');
});
