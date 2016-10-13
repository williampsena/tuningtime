import chalk from 'chalk';
import db from '../built-tests/js/stores/StoreContext';
import TaskModel from '../built-tests/js/models/Task.es6.js';
import fs from 'fs';

function getModel() {
  return new TaskModel({
    id: 1,
    name: 'Teste',
    performed: 0
  });
};

//
// Task store tests
//
describe('T2 - TaskStore', () => {
  ///
  /// Inserting a task
  ///
  it('T2.01 - As a user I want to create a task', done => {
    db.stores.task.create(getModel()).then((d) => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);
  
  ///
  /// Updating a task
  ///
  it('T2.02 - As a user I want to update the task performance', done => {
    var model = getModel();

    model.name = 'Testing';

    db.stores.task.update(model).then((d) => {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);
  
  ///
  /// Finding task by name
  ///
  it('T2.03 - As a user I want to find a task by content', done => {
    db.stores.task.findByContent('testin').then(tasks => {
      if(tasks.length === 0){
        throw new Error('Task not found!'); 
      }

      done();
    });
  }).timeout(5000);
  
  ///
  /// Removing a task
  ///
  it('T2.04 - As a user I want to remove task', done => {
    db.stores.task.remove(1).then(function() {
      done();
    }).catch(err => {
      throw err;
    });
  }).timeout(5000);
});