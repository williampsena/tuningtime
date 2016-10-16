'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extend = require('util')._extend;

var TaskLogModel = function () {
  function TaskLogModel(args) {
    _classCallCheck(this, TaskLogModel);

    args = args || {};

    this.id = undefined;
    this.task = undefined;
    this.timer = 0;
    this.createAt = new Date();
    this.modified = null;

    extend(this, args);
  }

  _createClass(TaskLogModel, null, [{
    key: 'mapToClass',
    value: function mapToClass(db) {
      db.taskLog.mapToClass(TaskLogModel, {
        id: Number,
        timer: Number,
        createAt: Date,
        modified: Date,
        task: {
          id: Number,
          name: String,
          createAt: Date,
          modified: Date,
          started: Boolean,
          completed: Boolean
        }
      });
    }
  }]);

  return TaskLogModel;
}();

exports.default = TaskLogModel;
module.exports = exports['default'];
//# sourceMappingURL=TaskLog.es6.js.map
