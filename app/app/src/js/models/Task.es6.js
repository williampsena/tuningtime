var extend = require('util')._extend;

export default class TaskModel {
  constructor(args) {
    args = args || {};

    this.id = undefined;
    this.name = '';
    this.started = false;
    this.completed = false;
    this.createAt = new Date();
    this.modified = null;
    extend(this, args);
  }

  static mapToClass(db) {
    db.task.mapToClass(TaskModel, {
      id: Number,
      name: String,
      started: Boolean,
      completed: Boolean,
      createAt: Date,
      modified: Date
    });
  }
}
