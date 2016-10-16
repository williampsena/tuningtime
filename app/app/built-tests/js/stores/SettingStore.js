'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _BaseStore2 = require('./BaseStore');

var _Session = require('../helpers/Session');

var _Setting = require('../models/Setting');

var _Setting2 = _interopRequireDefault(_Setting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SETTING_KEY = 'tuningtimer.setting';

var SettingStore = exports.SettingStore = function (_BaseStore) {
  _inherits(SettingStore, _BaseStore);

  function SettingStore(databases) {
    _classCallCheck(this, SettingStore);

    return _possibleConstructorReturn(this, (SettingStore.__proto__ || Object.getPrototypeOf(SettingStore)).call(this, databases, 'setting'));
  }

  _createClass(SettingStore, [{
    key: 'get',
    value: function get(id) {
      return this.first();
    }
  }, {
    key: 'update',
    value: function update(model) {
      var _this2 = this;

      return _get(SettingStore.prototype.__proto__ || Object.getPrototypeOf(SettingStore.prototype), 'update', this).call(this, model).then(function (setting) {
        _this2.setCurrent(model);
        return model;
      });
    }
  }, {
    key: 'load',
    value: function load() {
      var _this3 = this;

      return this.get().then(function (setting) {
        _this3.setCurrent(setting);
        return setting;
      });
    }
  }, {
    key: 'preload',
    value: function preload() {
      var _this4 = this;

      var currentSetting = this.current();

      if (currentSetting) {
        return this.load();
      }

      return this.count().then(function (count) {
        if (count > 0) {
          return _this4.load();
        }

        var currentSetting = new _Setting2.default();

        return _this4.create(currentSetting).then(function (setting) {
          currentSetting = new _Setting2.default();
          _this4.setCurrent(currentSetting);
        });
      });
    }
  }, {
    key: 'setCurrent',
    value: function setCurrent(setting) {
      if (setting) {
        _Session.SessionLocalHelper.create(SETTING_KEY, setting);
      }
    }
  }, {
    key: 'current',
    value: function current() {
      return _Session.SessionLocalHelper.get(SETTING_KEY);
    }
  }]);

  return SettingStore;
}(_BaseStore2.BaseStore);
//# sourceMappingURL=SettingStore.es6.js.map
