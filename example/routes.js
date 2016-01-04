'use strict';
var React = require('react');
var ReactRouter = require('react-router');
var Layout = require('./components/layout.jsx');
var Index = require('./components/index.jsx');
var About = require('./components/about.jsx');

var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

module.exports = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Index}/>
    <Route path="/about" component={About}/>
  </Route>
);
