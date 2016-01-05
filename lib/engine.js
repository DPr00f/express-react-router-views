'use strict';
var React = require('react');
var ReactDOM = require('react-dom/server');
var ReactRouter = require('react-router');
var util = require('util');
var lodash = require('lodash');

var omit = lodash.omit;
var merge = lodash.merge;

var TEMPLATE = 'var __EXPRESS_PROPS = %s;';
var DOCTYPE = '<!DOCTYPE html>';

module.exports = function engine(createOptions) {
  if(!createOptions.routes) {
    throw Error('Options need to contain defined routes.');
  }

  createOptions.renderOptionsKeysToFilter = createOptions.renderOptionsKeysToFilter || ['cache', 'settings', '_locals', 'routes'];
  createOptions.template = createOptions.template || TEMPLATE;
  createOptions.doctype = createOptions.doctype || DOCTYPE;

  return function render(requestedUrl, options, callback) {
    options = options || {};
    options.routes = options.routes || createOptions.routes;
    ReactRouter.match({ routes: options.routes, location: requestedUrl }, function (error, redirectLocation, renderProps) {
      if(error) {
        callback(error);
      } else if (renderProps) {
        var data = merge({}, omit(options, createOptions.renderOptionsKeysToFilter));
        var script = util.format(createOptions.template, JSON.stringify(data));
        global.__EXPRESS_PROPS = data;
        var html = createOptions.doctype + ReactDOM.renderToString(React.createElement(ReactRouter.RoutingContext, renderProps));
        html = html.replace('</head>', '<script type="application/javascript">' + script + '</script></head>');
        callback(null, html);
      } else {
          callback(Error('Route not found'));
      }
    });
  };
};
