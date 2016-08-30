var extend = require('util')._extend;

export default class TaskModel {
  constructor(args) {
    args = args || {};

    this._id = undefined;
    this.name = '';
    this.createAt = new Date();
    this.modified = null;
    this.started = false;
    this.completed = false;

    extend(this, args);
  }
}