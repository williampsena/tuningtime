'use strict';

var _TaskStoreEs = require('../built-tests/js/stores/TaskStore.es6.js');

var _TaskLogStoreEs = require('../built-tests/js/stores/TaskLogStore.es6.js');

var _TaskEs = require('../built-tests/js/models/Task.es6.js');

var _TaskEs2 = _interopRequireDefault(_TaskEs);

var _TaskLogEs = require('../built-tests/js/models/TaskLog.es6.js');

var _TaskLogEs2 = _interopRequireDefault(_TaskLogEs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chalk = require('chalk');


var taskCreated = undefined;

//
// Timer process
//
describe('T3 - TaskStoreHistory', function () {
  before(function (done) {
    _TaskLogStoreEs.TaskLogStore.removeAll().then(function () {
      done();
    });
  });

  ///
  /// Preparing task before to add history
  ///
  it('T3.01 - As a user I want to create a task before to create history', function (done) {
    _TaskStoreEs.TaskStore.create(new _TaskEs2.default({
      _id: 2,
      name: 'Playing video game'
    })).then(function (d) {
      taskCreated = d;
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Insert task history
  ///
  it('T3.02 - As a user I want to create task history', function (done) {
    _TaskLogStoreEs.TaskLogStore.create(new _TaskLogEs2.default({
      _id: 1,
      task: taskCreated,
      description: 'Firt level'
    })).then(function (d) {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Update task history
  ///
  it('T4.03 - As a user I want to update task history', function (done) {
    _TaskLogStoreEs.TaskLogStore.update(new _TaskEs2.default({
      _id: 1,
      description: 'Firt level :)'
    })).then(function (d) {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Remove task history
  ///
  it('T5.04 - As a user I want to remove task history', function (done) {
    _TaskLogStoreEs.TaskLogStore.remove({
      _id: 1
    }).then(function (d) {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Update task model in task history
  ///
  it('T5.05 - As a user I want to update task model in task history', function (done) {
    _TaskLogStoreEs.TaskLogStore.updateTask(new _TaskEs2.default({
      _id: 2,
      name: 'Playing video games'
    })).then(function (d) {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);
});