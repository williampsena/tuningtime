'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _SettingStore = require('./SettingStore');

var _TaskStore = require('./TaskStore');

var _TaskLogStore = require('./TaskLogStore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dexie = require('dexie');
Dexie.debug = true;

var db = new Dexie('TimeTuning');

db.version(1).stores({
  setting: "++id, interval, wait, createAt, modified",
  task: "++id, name, started, completed, createAt, modified",
  taskLog: "++id, task, timer, createAt, modified"
});

exports.default = {
  db: db,
  stores: {
    setting: new _SettingStore.SettingStore(db),
    task: new _TaskStore.TaskStore(db),
    taskLog: new _TaskLogStore.TaskLogStore(db)
  },
  clearDatabase: function clearDatabase() {
    return db.transaction('rw', db.taskLog, db.task, function () {
      return [db.taskLog.clear(), db.task.clear()];;
    });
  }
};
module.exports = exports['default'];
//# sourceMappingURL=StoreContext.es6.js.map
