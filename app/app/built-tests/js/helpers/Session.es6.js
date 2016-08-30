"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _SessionHelper = exports._SessionHelper = function () {
  function _SessionHelper() {
    _classCallCheck(this, _SessionHelper);
  }

  _createClass(_SessionHelper, [{
    key: "create",
    value: function create(key, value) {
      if (typeof value !== "string") {
        value = JSON.stringify(value);
      }

      window.localStorage.setItem(key, value);
    }
  }, {
    key: "remove",
    value: function remove(key) {
      window.localStorage.setItem(key, undefined);
    }
  }, {
    key: "get",
    value: function get(key) {
      var value;
      var valueAsJson = window.sessionStorage.getItem(key);

      if (valueAsJson) {
        value = JSON.parse(valueAsJson);
      }

      return value;
    }
  }]);

  return _SessionHelper;
}();

var SessionHelper = exports.SessionHelper = new _SessionHelper();