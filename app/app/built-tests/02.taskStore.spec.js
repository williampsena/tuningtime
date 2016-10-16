'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _StoreContext = require('../built-tests/js/stores/StoreContext');

var _StoreContext2 = _interopRequireDefault(_StoreContext);

var _TaskEs = require('../built-tests/js/models/Task.es6.js');

var _TaskEs2 = _interopRequireDefault(_TaskEs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */

function getModel() {
  return new _TaskEs2.default({
    id: 1,
    name: 'Teste',
    performed: 0
  });
};

//
// Task store tests
//
describe('T2 - TaskStore', function () {
  ///
  /// Inserting a task
  ///
  it('T2.01 - As a user I want to create a task', function (done) {
    _StoreContext2.default.stores.task.create(getModel()).then(function (d) {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Updating a task
  ///
  it('T2.02 - As a user I want to update the task performance', function (done) {
    var model = getModel();

    model.name = 'Testing';

    _StoreContext2.default.stores.task.update(model).then(function (d) {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Finding task by name
  ///
  it('T2.03 - As a user I want to find a task by content', function (done) {
    _StoreContext2.default.stores.task.findByContent('testin').then(function (tasks) {
      if (tasks.length === 0) {
        throw new Error('Task not found!');
      }

      done();
    });
  }).timeout(5000);

  ///
  /// Removing a task
  ///
  it('T2.04 - As a user I want to remove task', function (done) {
    _StoreContext2.default.stores.task.remove(1).then(function () {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);
});
//# sourceMappingURL=02.taskStore.spec.js.map
