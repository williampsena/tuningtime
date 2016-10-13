'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extend = require('util')._extend;

var SettingModel = function SettingModel(args) {
  _classCallCheck(this, SettingModel);

  args = args || {};

  this.id = 'config';
  this.interval = 20;
  this.wait = 5;
  this.createAt = new Date();
  this.modified = null;

  extend(this, args);
};

exports.default = SettingModel;
module.exports = exports['default'];
//# sourceMappingURL=Setting.es6.js.map
