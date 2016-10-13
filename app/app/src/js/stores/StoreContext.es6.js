import Q from 'q';
import { SettingStore } from './SettingStore';
import { TaskStore } from './TaskStore';
import { TaskLogStore } from './TaskLogStore';

const Dexie = require('dexie');
Dexie.debug = true;

let db = new Dexie('TimeTuning'); 

db.version(1).stores({
  setting: "++id, interval, wait, createAt, modified",
  task: "++id, name, started, completed, createAt, modified",
  taskLog: "++id, task, timer, createAt, modified"
});

export default {
  db: db,
  stores:{
    setting: new SettingStore(db),
    task: new TaskStore(db),
    taskLog: new TaskLogStore(db)
  },
  clearDatabase: function () {
    return db.transaction('rw', db.taskLog, db.task, function() {
      return [
        db.taskLog.clear(),
        db.task.clear()
      ];;
    });
  }
};