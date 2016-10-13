import chalk from 'chalk';
import db from '../built-tests/js/stores/StoreContext';
import TaskModel from '../built-tests/js/models/Task';
import TaskLogModel from '../built-tests/js/models/TaskLog';
import fs from 'fs';
import path from 'path';

var taskCreated, taskLogCreated;

function getTaskModel(id, name) {
  return new TaskModel({
    _id: id,
    name: name
  });
}

function getTaskLogModel(id, name, taskCreated) {
  return new TaskLogModel({
    _id: id,
    task: taskCreated,
    description: name
  });
}

//
// Timer process
//
describe('T3 - TaskStoreHistory', () => {
  before(done => {
    db.stores.taskLog.removeAll().then(() => {
      done();
    });
  });

  ///
  /// Preparing task before to add history
  ///
  it('T3.01 - As a user I want to create a task before to create history', (done) => {
    db.stores.taskLog.create(getTaskModel(1, 'Playing video games')).then(d => {
      taskCreated = d;
      done();
    });
  }).timeout(5000);

  ///
  /// Insert task history
  ///
  it('T3.02 - As a user I want to create task history', (done) => {
    db.stores.taskLog.create(getTaskLogModel(1, 'First level', taskCreated)).then(d => {
      taskLogCreated = d;
      done();
    });
  }).timeout(5000);

  ///
  /// Update task history
  ///
  it('T3.03 - As a user I want to update task history', (done) => {
    db.stores.taskLog.update(getTaskLogModel(taskLogCreated.id, 'First level :)', taskCreated)).then((d) => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);

  ///
  /// Remove task history
  ///
  it('T3.04 - As a user I want to remove task history', (done) => {
    db.stores.taskLog.remove(taskLogCreated.id).then((d) => {
      done();
    });
  }).timeout(5000);

  ///
  /// Update task model in task history
  ///
  it('T3.05 - As a user I want to update task model in task history', (done) => {
    db.stores.taskLog.updateTask(getTaskModel(taskCreated.id, 'Playing video games')).then(d => {
      done();
    });
  }).timeout(5000);
});