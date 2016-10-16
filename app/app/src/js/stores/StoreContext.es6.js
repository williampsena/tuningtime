import { SettingStore } from './SettingStore';
import { TaskStore } from './TaskStore';
import { TaskLogStore } from './TaskLogStore';

import TaskModel from '../models/Task';
import TaskLogModel from '../models/TaskLog';
import SettingModel from '../models/Setting';

const Dexie = require('dexie');
Dexie.debug = true;

let db = new Dexie('TimeTuning');

db.version(1).stores({
  setting: '++id,interval,wait,createAt,modified',
  task: '++id,name,started,completed,createAt,modified',
  taskLog: '++id,task.id,timer,createAt,modified'
});

TaskModel.mapToClass(db);
TaskLogModel.mapToClass(db);
SettingModel.mapToClass(db);

db.on('error', error => {
  console.error(error);
});

export default {
  db: db,
  stores: {
    setting: new SettingStore(db),
    task: new TaskStore(db),
    taskLog: new TaskLogStore(db)
  },
  clearDatabase: () => {
    return db.transaction('rw', db.taskLog, db.task, () => {
      return [
        db.taskLog.clear(),
        db.task.clear()
      ];
    });
  }
};

