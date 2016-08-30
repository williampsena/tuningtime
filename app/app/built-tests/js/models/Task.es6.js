'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extend = require('util')._extend;

var TaskModel = function TaskModel(args) {
  _classCallCheck(this, TaskModel);

  args = args || {};

  this._id = undefined;
  this.name = '';
  this.createAt = new Date();
  this.modified = null;
  this.started = false;
  this.completed = false;

  extend(this, args);
};

exports.default = TaskModel;
module.exports = exports['default'];