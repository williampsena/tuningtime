'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timer = exports.TIMERSTATUS = exports.TIMERSTAGE = exports.TIMER_SETTINGS = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Session = require('./Session');

var _Task = require('../models/Task');

var _Task2 = _interopRequireDefault(_Task);

var _TaskLog = require('../models/TaskLog');

var _TaskLog2 = _interopRequireDefault(_TaskLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TIMER_SETTINGS = exports.TIMER_SETTINGS = {
  interval: 1000, // 1000 mili
  max: 10, // 4 sec
  wait: 20 // 2 sec
};

var TIMERSTAGE = exports.TIMERSTAGE = {
  STARTED: 1,
  WAITING: 2,
  STOPPED: 3
};

var TIMERSTATUS = exports.TIMERSTATUS = {
  STARTED: 1,
  STOPPED: 3,
  PAUSED: 2
};

var TIMER_SESSION_KEY = 'tuningtimer.currentTimer';
var TIMER_HISTORY_SESSION_KEY = 'tuningtimer.currentTimerHistory';
var TIMER_CYCLECOUNTER = 'tuningtimer.cycleCounter';

var Timer = function () {
  function Timer(counter) {
    _classCallCheck(this, Timer);

    this.initialize(counter);
  }

  _createClass(Timer, [{
    key: 'initialize',
    value: function initialize(counter) {
      this.maxCounter = counter;
      this.counter = counter;
      this.counterValue = 0;
      this.status = TIMERSTATUS.STOPPED;
      this.stage = TIMERSTAGE.STOPPED;
      this.process = null;
      this.isWaiting = false;
      this.update();
    }
  }, {
    key: 'update',
    value: function update() {
      this.remaing = this.formatTimer();
    }
  }, {
    key: 'elapsed',
    value: function elapsed(done, _elapsed, stage) {
      done = done || function () {};

      if (_elapsed) {
        _elapsed(this);
      }

      if (this.counter == 0) {
        this.stop();
        done();
        done = function done() {};
        return;
      }

      this.stage = stage;
      this.counter--;
      this.counterValue = this.maxCounter - this.counter;
      this.update();
    }
  }, {
    key: 'start',
    value: function start(args) {
      this.isWaiting = false;

      args = args || {};
      args.done = args.done || function () {};
      args.elapsed = args.elapsed || function () {};
      args.counter = args.counter || TIMER_SETTINGS.max;

      this.counter = args.counter;
      this.maxCounter = this.counter;
      this.counterValue = 0;
      this.update();

      this.process = setInterval(this.elapsed.bind(this, args.done, args.elapsed, TIMERSTAGE.STARTED), TIMER_SETTINGS.interval);
      this.stage = TIMERSTAGE.STARTED;
      this.status = TIMERSTATUS.STARTED;

      this.listenPlayAudio();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.status = TIMERSTATUS.STOPPED;
      this.stage = TIMERSTAGE.STOPPED;
      clearInterval(this.process);
      this.process = null;
      this.counter = this.maxCounter;
      this.counterValue = 0;
      this.update();
      this.removeCurrentTimer();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.status = TIMERSTATUS.PAUSED;
      clearInterval(this.process);
      this.process = null;
    }
  }, {
    key: 'wait',
    value: function wait(args) {
      args = args || {};
      args.done = args.done || function () {};
      args.elapsed = args.elapsed || function () {};
      args.counter = args.counter || TIMER_SETTINGS.wait;

      this.counter = args.counter;
      this.maxCounter = this.counter;
      this.counterValue = 0;
      this.update();

      this.process = setInterval(this.elapsed.bind(this, args.done, args.elapsed, TIMERSTAGE.WAITING), TIMER_SETTINGS.interval);
      this.stage = TIMERSTAGE.WAITING;
      this.status = TIMERSTATUS.STARTED;

      this.listenWaitAudio();
    }
  }, {
    key: 'setCurrentTimer',
    value: function setCurrentTimer() {
      _Session.SessionLocalHelper.create(TIMER_SESSION_KEY, this);
    }
  }, {
    key: 'removeCurrentTimer',
    value: function removeCurrentTimer() {
      _Session.SessionLocalHelper.remove(TIMER_SESSION_KEY);
    }
  }, {
    key: 'getCurrentTimer',
    value: function getCurrentTimer() {
      var timer;
      var timerSession = _Session.SessionLocalHelper.get(TIMER_SESSION_KEY);

      if (timerSession) {
        timer = new Timer(timerSession.counter);
        timer.stage = timerSession.stage;
        timer.status = timerSession.status;
      }

      return timer;
    }
  }, {
    key: 'setCurrentTimerHistory',
    value: function setCurrentTimerHistory(model) {
      _Session.SessionLocalHelper.create(TIMER_HISTORY_SESSION_KEY, model);
    }
  }, {
    key: 'removeCurrentTimerHistory',
    value: function removeCurrentTimerHistory() {
      _Session.SessionLocalHelper.remove(TIMER_HISTORY_SESSION_KEY);
    }
  }, {
    key: 'getCurrentTimerHistory',
    value: function getCurrentTimerHistory() {
      var timerHistory = _Session.SessionLocalHelper.get(TIMER_HISTORY_SESSION_KEY);

      if (!timerHistory) {
        timerHistory = new _TaskLog2.default();
      }

      return timerHistory;
    }
  }, {
    key: 'formatTimer',
    value: function formatTimer() {
      var pad = "00";
      var minutes = String(Math.trunc(this.counter / 60));
      var seconds = String(Math.round(this.counter % 60, 2));

      minutes = pad.substring(0, pad.length - minutes.length) + minutes;
      seconds = pad.substring(0, pad.length - seconds.length) + seconds;

      return minutes.concat(":", seconds);
    }
  }, {
    key: 'toMinutes',
    value: function toMinutes(counter) {
      counter = counter || this.maxCounter || this.counter;

      var minutes = String(Math.round(counter / 60, 2));
      return minutes;
    }
  }, {
    key: 'listenPlayAudio',
    value: function listenPlayAudio() {
      this.listenAudio('play', 0.2);
    }
  }, {
    key: 'listenWaitAudio',
    value: function listenWaitAudio() {
      this.listenAudio('wait', 1);
    }
  }, {
    key: 'listenAudio',
    value: function listenAudio(audio, vol) {
      var audio = new Audio('audio/' + audio + '.mp3');
      audio.volume = vol || 0.2;
      audio.currentTime = 0;
      audio.play();
    }
  }, {
    key: 'getCycleCounter',
    value: function getCycleCounter() {
      return parseInt(_Session.SessionHelper.get(TIMER_CYCLECOUNTER)) || 0;
    }
  }, {
    key: 'incrementCycleCounter',
    value: function incrementCycleCounter() {
      var counter = this.getCycleCounter();

      counter = counter + 1;

      _Session.SessionHelper.create(TIMER_CYCLECOUNTER, String(counter));
    }
  }, {
    key: 'setCycleCounter',
    value: function setCycleCounter(counter) {
      if (typeof counter === "number") {
        console.log(String(counter));

        _Session.SessionHelper.create(TIMER_CYCLECOUNTER, String(counter));
      }
    }
  }]);

  return Timer;
}();

exports.Timer = Timer;
;
//# sourceMappingURL=Timer.es6.js.map
