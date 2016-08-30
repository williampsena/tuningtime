'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toasty = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */

var _require$remote = require('electron').remote;

var BrowserWindow = _require$remote.BrowserWindow;
var electronScreen = _require$remote.screen;
var _electronScreen$getPr = electronScreen.getPrimaryDisplay().size;
var width = _electronScreen$getPr.width;
var height = _electronScreen$getPr.height;


var toastyWindow = void 0;

var toastyWidth = 200;
var toastyHeight = 200;
var x = width - (toastyWidth + 50);
var y = height - (toastyHeight + 50);

var Toasty = exports.Toasty = function () {
  function Toasty() {
    _classCallCheck(this, Toasty);
  }

  _createClass(Toasty, null, [{
    key: 'load',
    value: function load(imageType) {
      this.closeWindow();

      if (toastyWindow) {
        toastyWindow.reload();
        toastyWindow.hide();
      } else {
        toastyWindow = new BrowserWindow({
          width: toastyWidth,
          height: toastyHeight,
          x: x,
          y: y,
          frame: false,
          movable: false,
          minimizable: false,
          maximizable: false,
          alwaysOnTop: true
        });

        toastyWindow.loadURL('file://' + _path2.default.resolve('./dist/main.html') + '#/toasty?imageType=' + imageType);
      }

      Toasty.animate(6);
      Toasty.close(7);
    }
  }, {
    key: 'animate',
    value: function animate(timeout) {
      timeout = timeout || 0;
      var timeoutMs = timeout * 1000;

      setTimeout(function () {
        Toasty.close();
      }, timeoutMs);
    }
  }, {
    key: 'close',
    value: function close(timeout) {
      timeout = timeout || 0;
      var timeoutMs = timeout * 1000;

      if (toastyWindow) {
        setTimeout(function () {
          if (toastyWindow) {
            toastyWindow.destroy();
            toastyWindow = undefined;
          }
        }, timeoutMs);
      }
    }
  }, {
    key: 'closeWindow',
    value: function closeWindow(id) {
      var windows = BrowserWindow.getAllWindows();
      windows.shift();

      windows.forEach(function (w) {
        return w.close();
      });
    }
  }]);

  return Toasty;
}();

;