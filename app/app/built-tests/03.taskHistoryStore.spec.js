'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _StoreContext = require('../built-tests/js/stores/StoreContext');

var _StoreContext2 = _interopRequireDefault(_StoreContext);

var _Task = require('../built-tests/js/models/Task');

var _Task2 = _interopRequireDefault(_Task);

var _TaskLog = require('../built-tests/js/models/TaskLog');

var _TaskLog2 = _interopRequireDefault(_TaskLog);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */

var taskCreated, taskLogCreated;

function getTaskModel(id, name) {
  return new _Task2.default({
    id: id,
    name: name
  });
}

function getTaskLogModel(id, name, taskCreated) {
  return new _TaskLog2.default({
    id: id,
    task: taskCreated,
    description: name
  });
}

//
// Timer process
//
describe('T3 - TaskStoreHistory', function () {
  before(function (done) {
    _StoreContext2.default.stores.taskLog.removeAll().then(function () {
      done();
    });
  });

  ///
  /// Preparing task before to add history
  ///
  it('T3.01 - As a user I want to create a task before to create history', function (done) {
    _StoreContext2.default.stores.task.create(getTaskModel(1, 'Playing video games')).then(function (d) {
      taskCreated = d;
      done();
    });
  }).timeout(5000);

  ///
  /// Insert task history
  ///
  it('T3.02 - As a user I want to create task history', function (done) {
    var m = getTaskLogModel(1, 'First level', taskCreated);

    _StoreContext2.default.stores.taskLog.create(m).then(function (d) {
      taskLogCreated = d;
      done();
    });
  }).timeout(5000);

  ///
  /// Update task history
  ///
  it('T3.03 - As a user I want to update task history', function (done) {
    var m = getTaskLogModel(taskLogCreated.id, 'First level :)', taskCreated);

    _StoreContext2.default.stores.taskLog.update(m).then(function (d) {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Update task model in task history
  ///
  it('T3.04 - As a user I want to update task model in task history', function (done) {
    var m = getTaskModel(taskCreated.id, 'Playing video games');

    _StoreContext2.default.stores.taskLog.updateTask(m).then(function (d) {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Update task model in task history
  ///
  it('T3.05 - As a user I want to filter task model by date', function (done) {
    _StoreContext2.default.stores.taskLog.filterByDate(new Date('1/1/2000'), new Date()).then(function (d) {
      console.log(d);
      done();
    });
  }).timeout(5000);

  ///
  /// Remove task history
  ///
  it('T3.06 - As a user I want to remove task history', function (done) {
    _StoreContext2.default.stores.taskLog.remove(taskLogCreated.id).then(function (d) {
      done();
    });
  }).timeout(5000);
});
//# sourceMappingURL=03.taskHistoryStore.spec.js.map
