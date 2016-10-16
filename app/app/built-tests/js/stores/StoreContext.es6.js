'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SettingStore = require('./SettingStore');

var _TaskStore = require('./TaskStore');

var _TaskLogStore = require('./TaskLogStore');

var _Task = require('../models/Task');

var _Task2 = _interopRequireDefault(_Task);

var _TaskLog = require('../models/TaskLog');

var _TaskLog2 = _interopRequireDefault(_TaskLog);

var _Setting = require('../models/Setting');

var _Setting2 = _interopRequireDefault(_Setting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dexie = require('dexie');
Dexie.debug = true;

var db = new Dexie('TimeTuning');

db.version(1).stores({
  setting: '++id,interval,wait,createAt,modified',
  task: '++id,name,started,completed,createAt,modified',
  taskLog: '++id,task.id,timer,createAt,modified'
});

_Task2.default.mapToClass(db);
_TaskLog2.default.mapToClass(db);
_Setting2.default.mapToClass(db);

db.on('error', function (error) {
  console.error(error);
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
      return [db.taskLog.clear(), db.task.clear()];
    });
  }
};
module.exports = exports['default'];
//# sourceMappingURL=StoreContext.es6.js.map
