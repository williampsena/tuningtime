'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extend = require('util')._extend;

var SettingModel = function () {
  function SettingModel(args) {
    _classCallCheck(this, SettingModel);

    args = args || {};

    this.id = 'config';
    this.interval = 20;
    this.wait = 5;
    this.createAt = new Date();
    this.modified = null;

    extend(this, args);
  }

  _createClass(SettingModel, null, [{
    key: 'mapToClass',
    value: function mapToClass(db) {
      db.setting.mapToClass(SettingModel, {
        id: Number,
        interval: Number,
        wait: Number,
        createAt: Date,
        modified: Date
      });
    }
  }]);

  return SettingModel;
}();

exports.default = SettingModel;
module.exports = exports['default'];
//# sourceMappingURL=Setting.es6.js.map
