import chalk from 'chalk';
import db from '../built-tests/js/stores/StoreContext';
import SettingModel from '../built-tests/js/models/Setting';
import fs from 'fs';

//
// Setting store tests
//
describe('T4 - SettingStore', () => {
  before(done => {
    db.stores.setting.removeAll().then(setting => {
      done();
    }).catch(err => {
      throw err;
    })
  });

  ///
  /// Inserting a setting
  ///
  it('T4.01 - As a user I want to create a setting', (done) => {
    db.stores.setting.create(new SettingModel({
      id: 'config',
      interval: 25,
      wait: 5
    })).then(() => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);
  
  ///
  /// Updating a setting
  ///
  it('T4.02 - As a user I want to update a setting', (done) => {
    db.stores.setting.update({
      id: 'config',
      wait: 10
    }).then(d => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);
  
  ///
  /// Get current setting
  ///
  it('T4.03 - As a user I want to get the current setting', (done) => {
    db.stores.setting.current();
    done();
  }).timeout(5000);

  ///
  /// Preload a setting
  ///
  it('T4.04 - As a user I want to preload a setting', (done) => {
    db.stores.setting.preload().then(setting => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Removing a setting
  ///
  it('T4.05 - As a user I want to remove a setting', (done) => {
    db.stores.setting.remove('config').then(d => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);
});