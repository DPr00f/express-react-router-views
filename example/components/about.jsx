'use strict';
var React = require('react');

module.exports = React.createClass({
  displayName: 'About',
  render: function render() {
    return (
      <div>I'm the about '{ this.props.var1 }'</div>
    );
  }
});
