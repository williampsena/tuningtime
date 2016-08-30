var chalk = require('chalk');
import { TaskStore } from '../built-tests/js/stores/TaskStore.es6.js';
import { TaskLogStore } from '../built-tests/js/stores/TaskLogStore.es6.js';
import TaskModel from '../built-tests/js/models/Task.es6.js';
import TaskLogModel from '../built-tests/js/models/TaskLog.es6.js';
import fs from 'fs';
import path from 'path';

var taskCreated = undefined;

//
// Timer process
//
describe('T3 - TaskStoreHistory', () => {
  before(done => {
    TaskLogStore.removeAll().then(() => {
      done();
    });
  });

  ///
  /// Preparing task before to add history
  ///
  it('T3.01 - As a user I want to create a task before to create history', (done) => {
    TaskStore.create(new TaskModel({
      _id: 2,
      name: 'Playing video game'
    })).then(d => {
      taskCreated = d;
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Insert task history
  ///
  it('T3.02 - As a user I want to create task history', (done) => {
    TaskLogStore.create(new TaskLogModel({
      _id: 1,
      task: taskCreated,
      description: 'Firt level'
    })).then((d) => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Update task history
  ///
  it('T4.03 - As a user I want to update task history', (done) => {
    TaskLogStore.update(new TaskModel({
      _id: 1,
      description: 'Firt level :)'
    })).then((d) => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Remove task history
  ///
  it('T5.04 - As a user I want to remove task history', (done) => {
    TaskLogStore.remove({
      _id: 1
    }).then((d) => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Update task model in task history
  ///
  it('T5.05 - As a user I want to update task model in task history', (done) => {
    TaskLogStore.updateTask(new TaskModel({
      _id: 2,
      name: 'Playing video games'
    })).then((d) => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);
});