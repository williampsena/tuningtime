import Q from 'q';
import DatabaseHelper from '../helpers/Database.es6.js';

let db = DatabaseHelper.createDatabase('taskLog');

class _TaskLogStore {
  constructor() {
    this.data = db;
  }

  create(model) {
    return Q.promise((resolve, reject) => {
      this.onCreate(model, resolve, reject);
    });
  }

  onCreate(model, resolve, reject) {
    this.data.insert(model, (err, doc) => {
      if (err) {
        return reject(err);
      }

      resolve(doc);
    });
  }

  update(model, query, options) {
    return Q.promise((resolve, reject) => {
      this.onUpdate(model, query, options, resolve, reject);
    });
  }

  onUpdate(model, query, options, resolve, reject) {
    if (!query) {
      query = { _id: model._id };
      delete model._id;
    }

    options = options || {};

    this.data.update(query, { $set: model }, options, (err, numReplaced) => {
      if (err) {
        return reject(err);
      }

      resolve(numReplaced);
    });
  }

  remove(query) {
    return Q.promise((resolve, reject) => {
      this.onRemove(query, resolve, reject);
    });
  }

  onRemove(query, resolve, reject) {
    this.data.remove(query, (err, numRemoved) => {
      if (err) {
        return reject(err);
      }

      resolve(numRemoved);
    });
  }

  removeAll() {
    return Q.promise((resolve, reject) => {
      this.onRemoveAll(resolve, reject);
    });
  }

  onRemoveAll(resolve, reject) {
    this.data.remove({}, { multi: true }, (err, numRemoved) => {
      if (err) {
        return reject(err);
      }

      resolve(numRemoved);
    });
  }

  filterByDate(start, end) {
    return Q.promise((resolve, reject) => {
      this.onFilterByDate(start, end, resolve, reject);
    });
  }

  onFilterByDate(start, end, resolve, reject) {
    this.data.find({
      $where: function () {
        return this.createAt >= start && this.createAt <= end;
      }
    }).exec((err, docs) => {
      if (err) {
        return reject(err);
      }

      resolve(docs);
    });
  }

  updateTask(model) {
    return Q.promise((resolve, reject) => {
      this.onUpdateTask(model, resolve, reject);
    });
  }

  onUpdateTask(model, resolve, reject) {
    this.data.update({ $where: () => this.task._id === model._id }, { $set: { task: model } },
      { multi: true },
      (err, numReplaced) => {
        if (err) {
          return reject(err);
        }

        resolve(numReplaced);
      });
  }
}

export var TaskLogStore = new _TaskLogStore();