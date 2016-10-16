'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable */

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var timeInterval = 1000; // 1000 mili
var maxInterval = 4; // 4 sec
var waitInterval = 2; // 2 sec

var TIMERSTATUS = {
  STARTED: 1,
  WAITING: 2,
  STOPPED: 3
};

var ModelTimer = function () {
  function ModelTimer(counter) {
    _classCallCheck(this, ModelTimer);

    this.counter = counter - 1; //Remove 1 counter because zero is not be considered in interval
    this.status = TIMERSTATUS.STOPPED;
    this.process = null;
  }

  _createClass(ModelTimer, [{
    key: 'elapsed',
    value: function elapsed(done, _elapsed) {
      done = done || function () {};

      console.log(_chalk2.default.green('Elapsed [counter = ' + this.counter + ']'));

      if (_elapsed) {
        _elapsed(this);
      }

      if (this.counter == 0) {
        this.stop();
        done();
        return;
      }

      this.status = TIMERSTATUS.STARTED;
      this.counter--;
    }
  }, {
    key: 'start',
    value: function start(args) {
      args = args || {};
      args.done = args.done || function () {};
      args.elapsed = args.elapsed || function () {};

      this.process = setInterval(this.elapsed.bind(this, args.done, args.elapsed), timeInterval);
    }
  }, {
    key: 'stop',
    value: function stop() {
      console.log(_chalk2.default.red('Stopped'));

      this.status = TIMERSTATUS.STOPPED;
      clearInterval(this.process);
      this.process = null;
    }
  }, {
    key: 'wait',
    value: function wait(args) {
      console.log(_chalk2.default.yellow('Waiting [counter = ' + this.counter + ']'));

      args = args || {};
      args.done = args.done || function () {};
      args.elapsed = args.elapsed || function () {};

      this.process = setInterval(this.elapsed.bind(this, args.done, args.elapsed, TIMERSTATUS.WAITING), timeInterval);
    }
  }]);

  return ModelTimer;
}();

;

//
// Timer process
//
describe('T1 - Timer helper', function () {
  beforeEach(function () {});

  it('T1.01 - As a user I want to start a new cycle', function (_done) {
    var model = new ModelTimer(maxInterval, timeInterval);
    model.start({
      done: function done() {
        return _done();
      }
    });
  }).timeout(5000);

  it('T1.02 - As a user I want start a new cycle and stop', function (done) {
    var model = new ModelTimer(maxInterval, timeInterval);

    model.start();

    function cancelTimer() {
      model.stop();
      done();
    }

    cancelTimer.bind(undefined);

    setTimeout(cancelTimer, 2000);
  }).timeout(5000);

  it('T1.03 - As a user I want start a new cycle, pause and stop', function (_done2) {
    var model = new ModelTimer(maxInterval, timeInterval);

    model.start({
      done: function done() {
        model.wait({
          done: function done() {
            return _done2();
          }
        });
      }
    });
  }).timeout(10000);
});
//# sourceMappingURL=01.timerHelper.spec.js.map
