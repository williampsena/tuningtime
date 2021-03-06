'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nedb = require('nedb');

var _nedb2 = _interopRequireDefault(_nedb);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DatabaseHelper = function () {
  function DatabaseHelper() {
    _classCallCheck(this, DatabaseHelper);
  }

  _createClass(DatabaseHelper, null, [{
    key: 'createDatabase',
    value: function createDatabase(dbFile) {
      return new _nedb2.default({ filename: _path2.default.resolve('./db/' + dbFile + '.db'), autoload: true });
    }
  }]);

  return DatabaseHelper;
}();

exports.default = DatabaseHelper;
module.exports = exports['default'];