'use strict';
var React = require('react');
var ReactRouter = require('react-router');
var ExpressReactRouterClient = require('../../lib/client');
var Link = ReactRouter.Link;
var IndexLink = ReactRouter.IndexLink;

var ACTIVE = { color: 'red' };

var Layout = React.createClass({
  render: function render() {
    return (
      <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>{ ExpressReactRouterClient.getProps().title }</title>
      </head>
      <body>
        <h1>APP!</h1>
        <ul>
          <li><Link      to="/"           activeStyle={ACTIVE}>/</Link></li>
          <li><IndexLink to="/"           activeStyle={ACTIVE}>/ IndexLink</IndexLink></li>

          <li><Link      to="/about"      activeStyle={ACTIVE}>/about</Link></li>
        </ul>

        { this.props.children && React.cloneElement(this.props.children, ExpressReactRouterClient.getProps())}
        <script src="/main.js"></script>
      </body>
      </html>
    );
  }
});

module.exports = Layout;
