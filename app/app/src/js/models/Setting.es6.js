var extend = require('util')._extend;

export default class SettingModel {
  constructor(args) {
    args = args || {};

    this.id = 'config';
    this.interval = 20;
    this.wait = 5;
    this.createAt = new Date();
    this.modified = null;

    extend(this, args);
  }
}