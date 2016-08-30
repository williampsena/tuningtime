'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotifyHelper = exports._NotifyHelper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lang = require('../config/lang');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _NotifyHelper = exports._NotifyHelper = function () {
  function _NotifyHelper() {
    _classCallCheck(this, _NotifyHelper);
  }

  _createClass(_NotifyHelper, [{
    key: 'notifyTimeOver',
    value: function notifyTimeOver(min) {
      this.notify(_lang.CurrentLanguage.alert.timeOver.title, _lang.CurrentLanguage.alert.timeOver.message.replace('{{min}}', min));
    }
  }, {
    key: 'notifyStopped',
    value: function notifyStopped() {
      this.notify(_lang.CurrentLanguage.alert.stopped.title, _lang.CurrentLanguage.alert.stopped.message);
    }
  }, {
    key: 'notifyStarted',
    value: function notifyStarted(min) {
      this.notify(_lang.CurrentLanguage.alert.started.title, _lang.CurrentLanguage.alert.started.message.replace('{{min}}', min));
    }
  }, {
    key: 'notify',
    value: function notify(title, body) {
      new Notification(title, {
        body: body
      });
    }
  }]);

  return _NotifyHelper;
}();

var NotifyHelper = exports.NotifyHelper = new _NotifyHelper();