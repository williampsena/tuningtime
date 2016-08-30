var chalk = require('chalk');
import { SettingStore } from '../built-tests/js/stores/SettingStore.es6.js';
import SettingModel from '../built-tests/js/models/Setting.es6.js';
import fs from 'fs';

//
// Setting store tests
//
describe('T4 - SettingStore', () => {
  before(done => {
    SettingStore.removeAll().then(() => {
      done();
    });
  });

  ///
  /// Inserting a setting
  ///
  it('T4.01 - As a user I want to create a setting', (done) => {
    SettingStore.create(new SettingModel({
      _id: 1,
      interval: 25,
      wait: 5
    })).then((d) => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);
  
  ///
  /// Updating a setting
  ///
  it('T4.02 - As a user I want to update a setting', (done) => {
    SettingStore.update({
      _id: 1,
      wait: 10
    }).then((d) => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);
  
  ///
  /// Get current setting
  ///
  it('T4.03 - As a user I want to get the current setting', (done) => {
    SettingStore.current().then((model) => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Removing a setting
  ///
  it('T4.04 - As a user I want to remove a setting', (done) => {
    SettingStore.remove({
      _id: 1
    }).then((d) => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);
});