'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extend = require('util')._extend;

var SettingModel = function SettingModel(args) {
  _classCallCheck(this, SettingModel);

  args = args || {};

  this._id = undefined;
  this.interval = 0;
  this.wait = 0;
  this.createAt = new Date();
  this.modified = null;

  extend(this, args);
};

exports.default = SettingModel;
module.exports = exports['default'];