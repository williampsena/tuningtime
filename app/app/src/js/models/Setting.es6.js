var extend = require('util')._extend;

export default class SettingModel {
  constructor(args) {
    args = args || {};

    this._id = undefined;
    this.interval = 0;
    this.wait = 0;
    this.createAt = new Date();
    this.modified = null;

    extend(this, args);
  }
}