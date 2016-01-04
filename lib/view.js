'use strict';
var ExpressView = require('express/lib/view');
var util = require('util');

var View = function View() {
  ExpressView.apply(this, arguments);
};

util.inherits(View, ExpressView);

View.prototype.lookup = function lookup(name) {
  return name;
};

View.prototype.render = function render(options, fn) {
  this.engine(this.name, options, fn);
};

module.exports = View;
