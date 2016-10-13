import Q from 'q';
import { BaseStore } from './BaseStore';
import { SessionLocalHelper } from '../helpers/Session';
import SettingModel from '../models/Setting';

const SETTING_KEY = 'tuningtimer.setting';

export class SettingStore extends BaseStore {
  constructor(databases) {
    super(databases, 'setting');
  }

  get(id){
    return this.first();
  }

  update(model){
    return super.update(model).then((setting) => {
      this.setCurrent(model);
      return model;
    });
  }

  load(){
    return this.get().then((setting) => {
      this.setCurrent(setting);
      return setting;
    });
  }

  preload() {
    var currentSetting = this.current();
    
    if(currentSetting) {
        return this.load();
    }

    return this.count().then(count => {
      if(count > 0) {
        return this.load();
      }

      var currentSetting = new SettingModel();

      return this.create(currentSetting).then(setting => {
        currentSetting = new SettingModel();
        this.setCurrent(currentSetting);
      });
    });
  }

  setCurrent(setting) {
    if(setting){
      SessionLocalHelper.create(SETTING_KEY, setting);
    }
  }

  current() {
    return SessionLocalHelper.get(SETTING_KEY);
  }
}