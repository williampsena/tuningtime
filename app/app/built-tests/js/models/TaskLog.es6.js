'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extend = require('util')._extend;

var TaskLogModel = function TaskLogModel(args) {
  _classCallCheck(this, TaskLogModel);

  args = args || {};

  this._id = undefined;
  this.task = undefined;
  this.timer = 0;
  this.createAt = new Date();
  this.modified = null;

  extend(this, args);
};

exports.default = TaskLogModel;
module.exports = exports['default'];