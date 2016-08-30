'use strict';

var _TaskStoreEs = require('../built-tests/js/stores/TaskStore.es6.js');

var _TaskEs = require('../built-tests/js/models/Task.es6.js');

var _TaskEs2 = _interopRequireDefault(_TaskEs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chalk = require('chalk');


//
// Task store tests
//
describe('T2 - TaskStore', function () {
  before(function (done) {
    _TaskStoreEs.TaskStore.removeAll().then(function () {
      done();
    });
  });

  ///
  /// Inserting a task
  ///
  it('T2.01 - As a user I want to create a task', function (done) {
    _TaskStoreEs.TaskStore.create(new _TaskEs2.default({
      _id: 1,
      name: 'Teste',
      performed: 0
    })).then(function (d) {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Updating a task
  ///
  it('T2.02 - As a user I want to update the task performance', function (done) {
    _TaskStoreEs.TaskStore.update({
      _id: 1,
      performed: 100
    }).then(function (d) {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Finding task by name
  ///
  it('T2.03 - As a user I want to find a task by content', function (done) {
    _TaskStoreEs.TaskStore.findByContent('tes').then(function (d) {
      if (d.length === 0) {
        throw new Error('Task not found!');
      }

      done();
    }).catch(function (err) {
      console.log(chalk.red(err));
      throw err;
    });
  }).timeout(5000);

  ///
  /// Removing a task
  ///
  it('T2.04 - As a user I want to remove task', function (done) {
    _TaskStoreEs.TaskStore.remove({
      _id: 1
    }).then(function (d) {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);
});