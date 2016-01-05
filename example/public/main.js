'use strict';
var ExpressReactRouter = require('../../');
var routes = require('../routes');

ExpressReactRouter.client.render({
  routes: routes
});
