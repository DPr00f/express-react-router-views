'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var merge = require('lodash-node/compat/object/merge');
var history = require('history');
var createHistory = history.createHistory;
var useBasename = history.useBasename;
var Router = ReactRouter.Router;

var RouterComponent = React.createClass({
  displayName: 'RouterComponent',

  render: function render() {
    return React.createElement(Router, { history: this.props.history }, this.props.routes);
  }
});

function getData(options) {
  var history = options.history || useBasename(createHistory)({
    basename: '/'
  });
  var routes = options.routes;
  if (!routes) {
    throw Error('routes need to be passed into the options');
  }
  return {
    routes: routes,
    history: history
  };
}

function getGlobal() {
  if(typeof global !== 'undefined') {
    return global;
  } else if(typeof window !== 'undefined') {
    return window;
  }
}

module.exports = {
  getProps: function getProps() {
    return getGlobal().__EXPRESS_PROPS;
  },

  addToProps: function addToProps(obj) {
    getGlobal().__EXPRESS_PROPS = merge(getGlobal().__EXPRESS_PROPS, obj);
  },

  render: function render(options) {
    var data = getData(options);
    var props = {
      routes: data.routes,
      history: data.history
    };

    ReactDOM.render(React.createElement(RouterComponent, props), document);
  }
};
