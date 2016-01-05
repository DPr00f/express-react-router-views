'use strict';
var browserify = require('browserify-middleware');
var reactify = require('reactify');
var express = require('express');
var path = require('path');
var ExpressReactRouter = require(path.join(__dirname, '/../../'));

require('node-jsx').install();

var routes = require(path.join(__dirname, '/../routes'));
var app = express();

app.engine('.jsx', ExpressReactRouter.engine({
  routes: routes
}));

app.get('/main.js',
  browserify(path.join(__dirname, '/../public/main.js'), {
    transform: [ reactify ]
  })
);

app.use('/', express['static'](path.join(__dirname, '/../public')));

app.set('view engine', 'jsx');
app.set('view', ExpressReactRouter.view);

app.use(function(req, res, next) {
  app.locals.title = 'Page title set from express';
  app.locals.var1 = 'Another variable from express';
  next();
});

app.get('/*', function(req, res) {
  res.render(req.url);
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example server started http://%s:%s', host, port);
});
