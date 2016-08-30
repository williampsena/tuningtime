import Q from 'q';
import DatabaseHelper from '../helpers/Database.es6.js';

let db = DatabaseHelper.createDatabase('task');

class _TaskStore {
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

  findByContent(name, completed, limit) {
    if(typeof completed !== "boolean"){
      completed = false;
    }
    
    return Q.promise((resolve, reject) => {
      this.onFindByContent(name, completed, limit, resolve, reject);
    });
  }

  onFindByContent(name, completed, limit, resolve, reject) {
    var query = this.data.find({ $where: function() { 
      return this.completed === completed && new RegExp('^' + name, 'i').test(this.name);
    }});

    if(typeof limit == "number"){
      query = query.limit(limit);
    }
    
    return query.exec((err, docs) => {
      if (err) {
        return reject(err);
      }

      resolve(docs);
    });
  }
  
  getById(id) {
    return Q.promise((resolve, reject) => {
      this.onGetTaskStarted(id, resolve, reject);
    });
  }

  onGetById(id, resolve, reject) {
    this.data.find({ $where: function() { 
      return id == this._id
    }}).limit(1).exec((err, docs) => {
      if (err) {
        return reject(err);
      }

      resolve(docs[0]);
    });
  }
}

export var TaskStore = new _TaskStore();