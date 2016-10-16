'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskLogStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseStore2 = require('./BaseStore');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TaskLogStore = exports.TaskLogStore = function (_BaseStore) {
  _inherits(TaskLogStore, _BaseStore);

  function TaskLogStore(databases) {
    _classCallCheck(this, TaskLogStore);

    return _possibleConstructorReturn(this, (TaskLogStore.__proto__ || Object.getPrototypeOf(TaskLogStore)).call(this, databases, 'taskLog'));
  }

  _createClass(TaskLogStore, [{
    key: 'filterByDate',
    value: function filterByDate(start, end) {
      return this.db.where('createAt').between(start, end).toArray();
    }
  }, {
    key: 'updateTask',
    value: function updateTask(model) {
      return this.db.where('task.id').equals(model.id).modify(function (x) {
        x.task = model;
      });
    }
  }]);

  return TaskLogStore;
}(_BaseStore2.BaseStore);
//# sourceMappingURL=TaskLogStore.es6.js.map
