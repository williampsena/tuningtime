import Q from 'q';
import DatabaseHelper from '../helpers/Database.es6.js';
import { SessionHelper } from '../helpers/Session';

let db = DatabaseHelper.createDatabase('setting');

const SETTING_KEY = 'tuningtimer.setting';

class _SettingStore {
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

      this.get().then(() => {
        resolve(numReplaced);
      });
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

  get() {
    return Q.promise((resolve, reject) => {
      this.onGet(resolve, reject);
    });
  }

  onGet(resolve, reject) {
    this.data.find().limit(1).exec((err, docs) => {
      if (err) {
        return reject(err);
      }

      resolve(docs[0]);
    });
  }

  preload() {
    this.get().then((setting) => {
      this.setCurrent(setting);
    });
  }

  setCurrent(setting) {
    SessionHelper.create(SETTING_KEY, setting)
  }

  current() {
    return SessionHelper.get(SETTING_KEY);
  }
}

export var SettingStore = new _SettingStore();