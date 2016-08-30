'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowHelper = exports._WindowHelper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require('electron');

var _electron2 = _interopRequireDefault(_electron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var window = _electron2.default.remote.getCurrentWindow();

var _WindowHelper = exports._WindowHelper = function () {
  function _WindowHelper() {
    _classCallCheck(this, _WindowHelper);
  }

  _createClass(_WindowHelper, [{
    key: 'restore',
    value: function restore(timeout) {
      timeout = timeout || 0;
      var timeoutMs = timeout * 1000;

      setTimeout(function () {
        window.restore();
      }, timeoutMs);
    }
  }, {
    key: 'minimize',
    value: function minimize(timeout) {
      timeout = timeout || 0;
      var timeoutMs = timeout * 1000;

      setTimeout(function () {
        window.minimize();
      }, timeoutMs);
    }
  }]);

  return _WindowHelper;
}();

var WindowHelper = exports.WindowHelper = new _WindowHelper();