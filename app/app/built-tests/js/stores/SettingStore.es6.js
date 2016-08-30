'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _databaseEs = require('../helpers/database.es6.js');

var _databaseEs2 = _interopRequireDefault(_databaseEs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var db = _databaseEs2.default.createDatabase('setting');

var _SettingStore = function () {
  function _SettingStore() {
    _classCallCheck(this, _SettingStore);

    this.data = db;
  }

  _createClass(_SettingStore, [{
    key: 'create',
    value: function create(model) {
      var _this = this;

      return _q2.default.promise(function (resolve, reject) {
        _this.onCreate(model, resolve, reject);
      });
    }
  }, {
    key: 'onCreate',
    value: function onCreate(model, resolve, reject) {
      this.data.insert(model, function (err, doc) {
        if (err) {
          return reject(err);
        }

        resolve(doc);
      });
    }
  }, {
    key: 'update',
    value: function update(model, query, options) {
      var _this2 = this;

      return _q2.default.promise(function (resolve, reject) {
        _this2.onUpdate(model, query, options, resolve, reject);
      });
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(model, query, options, resolve, reject) {
      if (!query) {
        query = { _id: model._id };
        delete model._id;
      }

      options = options || {};

      this.data.update(query, { $set: model }, options, function (err, numReplaced) {
        if (err) {
          return reject(err);
        }

        resolve(numReplaced);
      });
    }
  }, {
    key: 'remove',
    value: function remove(query) {
      var _this3 = this;

      return _q2.default.promise(function (resolve, reject) {
        _this3.onRemove(query, resolve, reject);
      });
    }
  }, {
    key: 'onRemove',
    value: function onRemove(query, resolve, reject) {
      this.data.remove(query, function (err, numRemoved) {
        if (err) {
          return reject(err);
        }

        resolve(numRemoved);
      });
    }
  }, {
    key: 'removeAll',
    value: function removeAll() {
      var _this4 = this;

      return _q2.default.promise(function (resolve, reject) {
        _this4.onRemoveAll(resolve, reject);
      });
    }
  }, {
    key: 'onRemoveAll',
    value: function onRemoveAll(resolve, reject) {
      this.data.remove({}, { multi: true }, function (err, numRemoved) {
        if (err) {
          return reject(err);
        }

        resolve(numRemoved);
      });
    }
  }, {
    key: 'current',
    value: function current() {
      var _this5 = this;

      return _q2.default.promise(function (resolve, reject) {
        _this5.onCurrent(resolve, reject);
      });
    }
  }, {
    key: 'onCurrent',
    value: function onCurrent(resolve, reject) {
      this.data.find().limit(1).exec(function (err, docs) {
        if (err) {
          return reject(err);
        }

        resolve(docs[0]);
      });
    }
  }]);

  return _SettingStore;
}();

var SettingStore = exports.SettingStore = new _SettingStore();