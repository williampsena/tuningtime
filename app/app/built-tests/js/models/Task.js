'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extend = require('util')._extend;

var TaskModel = function () {
  function TaskModel(args) {
    _classCallCheck(this, TaskModel);

    args = args || {};

    this.id = undefined;
    this.name = '';
    this.started = false;
    this.completed = false;
    this.createAt = new Date();
    this.modified = null;
    extend(this, args);
  }

  _createClass(TaskModel, null, [{
    key: 'mapToClass',
    value: function mapToClass(db) {
      db.task.mapToClass(TaskModel, {
        id: Number,
        name: String,
        started: Boolean,
        completed: Boolean,
        createAt: Date,
        modified: Date
      });
    }
  }]);

  return TaskModel;
}();

exports.default = TaskModel;
module.exports = exports['default'];
//# sourceMappingURL=Task.es6.js.map
