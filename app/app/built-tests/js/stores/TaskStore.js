'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _BaseStore2 = require('./BaseStore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TaskStore = exports.TaskStore = function (_BaseStore) {
  _inherits(TaskStore, _BaseStore);

  function TaskStore(databases) {
    _classCallCheck(this, TaskStore);

    return _possibleConstructorReturn(this, (TaskStore.__proto__ || Object.getPrototypeOf(TaskStore)).call(this, databases, 'task'));
  }

  _createClass(TaskStore, [{
    key: 'findByContent',
    value: function findByContent(name, completed, limit) {
      if (typeof completed !== "boolean") {
        completed = false;
      }

      var query = this.db.where('name').startsWithIgnoreCase(name).filter(function (x) {
        return x.completed === completed;
      });

      if (typeof limit == "number") {
        query = query.limit(limit);
      }

      return query.toArray().catch(function (err) {
        throw err;
      });
    }
  }]);

  return TaskStore;
}(_BaseStore2.BaseStore);
//# sourceMappingURL=TaskStore.es6.js.map
