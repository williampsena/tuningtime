import Q from 'q';
import DatabaseHelper from '../helpers/Database.es6.js';

export default class ClearDatabase {
  constructor() {
    var dbTaskLog = DatabaseHelper.createDatabase('taskLog');
    var dbTask = DatabaseHelper.createDatabase('task');
    
    this.data = {
      dbTaskLog: dbTaskLog,
      dbTask: dbTask
    };
  }

  removeAll() {
    return Q.promise((resolve, reject) => {
      this.onRemoveAll(resolve, reject);
    });
  }

  onRemoveAll(resolve, reject) {
    return Q.promise((resolve, reject) => {
      return this.data.dbTaskLog.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
          return reject(err);
        }

        resolve(numRemoved);
      });
    }).then(() => {
        this.data.dbTask.remove({}, { multi: true }, (err, numRemoved) => {
          if (err) {
            return reject(err);
          }

          resolve(numRemoved);
        });
    });
  }
}