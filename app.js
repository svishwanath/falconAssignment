var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var api = require('./routes/api');
var debug = require('debug')('falconAssigment');
var app = express();
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  debug('listening on port for data ' + server.address().port);
});
api.socketServer(server);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use('/api',api);
app.use('/', routes);
app.use('/partials/:name', routes);






