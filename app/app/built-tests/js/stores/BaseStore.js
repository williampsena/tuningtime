'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseStore = exports.BaseStore = function () {
  function BaseStore(db, dbContextName) {
    _classCallCheck(this, BaseStore);

    this.dbContext = db;
    this.db = db[dbContextName];
  }

  _createClass(BaseStore, [{
    key: 'transaction',
    value: function transaction() {
      return this.dbContext.transaction.apply(this, arguments);
    }
  }, {
    key: 'count',
    value: function count() {
      return this.db.count().catch(function (err) {
        throw err;
      });
    }
  }, {
    key: 'first',
    value: function first() {
      return this.db.toCollection().first().catch(function (err) {
        throw err;
      });
    }
  }, {
    key: 'all',
    value: function all() {
      return this.db.toCollection().toArray().catch(function (err) {
        throw err;
      });
    }
  }, {
    key: 'get',
    value: function get(id) {
      return this.db.filter(function (x) {
        return x.id === id;
      }).toArray().catch(function (err) {
        throw err;
      });
    }
  }, {
    key: 'create',
    value: function create(model) {
      delete model.id;

      return this.db.add(model).catch(function (err) {
        throw err;
      }).then(function () {
        return model;
      });
    }
  }, {
    key: 'update',
    value: function update(model) {
      var id = model.id;

      delete model.id;

      return this.db.update(id, model).catch(function (err) {
        throw err;
      }).then(function () {
        return model;
      });
    }
  }, {
    key: 'remove',
    value: function remove(id) {
      return this.db.delete(id).catch(function (err) {
        throw err;
      });
    }
  }, {
    key: 'removeAll',
    value: function removeAll() {
      return this.db.clear().catch(function (err) {
        throw err;
      });
    }
  }]);

  return BaseStore;
}();
//# sourceMappingURL=BaseStore.es6.js.map
