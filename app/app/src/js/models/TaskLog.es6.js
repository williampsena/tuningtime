var extend = require('util')._extend;

export default class TaskLogModel {
  constructor(args) {
    args = args || {};

    this.id = undefined;
    this.task = undefined;
    this.timer = 0;
    this.createAt = new Date();
    this.modified = null;

    extend(this, args);
  }

  static mapToClass(db) {
    db.taskLog.mapToClass(TaskLogModel, {
      id: Number,
      timer: Number,
      createAt: Date,
      modified: Date,
      task: {
        id: Number,
        name: String,
        createAt: Date,
        modified: Date,
        started: Boolean,
        completed: Boolean
      }
    });
  }
}
