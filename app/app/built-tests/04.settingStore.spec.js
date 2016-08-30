'use strict';

var _SettingStoreEs = require('../built-tests/js/stores/SettingStore.es6.js');

var _SettingEs = require('../built-tests/js/models/Setting.es6.js');

var _SettingEs2 = _interopRequireDefault(_SettingEs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chalk = require('chalk');


//
// Setting store tests
//
describe('T4 - SettingStore', function () {
  before(function (done) {
    _SettingStoreEs.SettingStore.removeAll().then(function () {
      done();
    });
  });

  ///
  /// Inserting a setting
  ///
  it('T4.01 - As a user I want to create a setting', function (done) {
    _SettingStoreEs.SettingStore.create(new _SettingEs2.default({
      _id: 1,
      interval: 25,
      wait: 5
    })).then(function (d) {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Updating a setting
  ///
  it('T4.02 - As a user I want to update a setting', function (done) {
    _SettingStoreEs.SettingStore.update({
      _id: 1,
      wait: 10
    }).then(function (d) {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Get current setting
  ///
  it('T4.03 - As a user I want to get the current setting', function (done) {
    _SettingStoreEs.SettingStore.get().then(function (model) {
      console.log(model);
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Removing a setting
  ///
  it('T4.04 - As a user I want to remove a setting', function (done) {
    _SettingStoreEs.SettingStore.remove({
      _id: 1
    }).then(function (d) {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);
});