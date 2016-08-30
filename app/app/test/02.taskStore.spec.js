var chalk = require('chalk');
import { TaskStore } from '../built-tests/js/stores/TaskStore.es6.js';
import TaskModel from '../built-tests/js/models/Task.es6.js';
import fs from 'fs';

//
// Task store tests
//
describe('T2 - TaskStore', () => {
  before(done => {
    TaskStore.removeAll().then(() => {
      done();
    });
  });

  ///
  /// Inserting a task
  ///
  it('T2.01 - As a user I want to create a task', (done) => {
    TaskStore.create(new TaskModel({
      _id: 1,
      name: 'Teste',
      performed: 0
    })).then((d) => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);
  
  ///
  /// Updating a task
  ///
  it('T2.02 - As a user I want to update the task performance', (done) => {
    TaskStore.update({
      _id: 1,
      performed: 100
    }).then((d) => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);
  
  ///
  /// Finding task by name
  ///
  it('T2.03 - As a user I want to find a task by content', (done) => {
    TaskStore.findByContent('tes').then((d) => {
      if(d.length === 0){
        throw new Error('Task not found!'); 
      }
      
      done();
    }).catch(err => {
      console.log(chalk.red(err));
      throw err;
    });
  }).timeout(5000);
  
  ///
  /// Removing a task
  ///
  it('T2.04 - As a user I want to remove task', (done) => {
    TaskStore.remove({
      _id: 1
    }).then((d) => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);
});