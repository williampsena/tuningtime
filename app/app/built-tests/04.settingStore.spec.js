'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _StoreContext = require('../built-tests/js/stores/StoreContext');

var _StoreContext2 = _interopRequireDefault(_StoreContext);

var _Setting = require('../built-tests/js/models/Setting');

var _Setting2 = _interopRequireDefault(_Setting);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// Setting store tests
//
/* eslint-disable */

describe('T4 - SettingStore', function () {
  before(function (done) {
    _StoreContext2.default.stores.setting.removeAll().then(function (setting) {
      done();
    }).catch(function (err) {
      throw err;
    });
  });

  ///
  /// Inserting a setting
  ///
  it('T4.01 - As a user I want to create a setting', function (done) {
    _StoreContext2.default.stores.setting.create(new _Setting2.default({
      id: 'config',
      interval: 25,
      wait: 5
    })).then(function () {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Updating a setting
  ///
  it('T4.02 - As a user I want to update a setting', function (done) {
    _StoreContext2.default.stores.setting.update({
      id: 'config',
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
    _StoreContext2.default.stores.setting.current();
    done();
  }).timeout(5000);

  ///
  /// Preload a setting
  ///
  it('T4.04 - As a user I want to preload a setting', function (done) {
    _StoreContext2.default.stores.setting.preload().then(function (setting) {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Removing a setting
  ///
  it('T4.05 - As a user I want to remove a setting', function (done) {
    _StoreContext2.default.stores.setting.remove('config').then(function (d) {
      done();
    }).catch(function (err) {
      throw err;
    });
  }).timeout(5000);
});
//# sourceMappingURL=04.settingStore.spec.js.map
