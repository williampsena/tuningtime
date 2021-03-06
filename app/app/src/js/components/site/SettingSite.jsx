import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';
import { CurrentLanguage } from '../../config/lang';
import { SettingStore } from '../../stores/SettingStore';
import ClearDatabase from '../../stores/ClearDatabase';

import SettingModel from '../../models/Setting';
import MenuBar from './common/MenuBar';
import BaseSite from './BaseSite';

const remote = require('electron').remote;

export default class SettingSite extends BaseSite {
  static defaultProps = {
    displayName: 'SettingSite'
  }

  constructor(props) {
    super(props);

    this.state = {};

    this.state.fields = {
      interval: { value: 25, requestChange: (newValue) => { this.changeState('interval', newValue); } },
      wait: { value: 5, requestChange: (newValue) => { this.changeState('wait', newValue); } }
    };

    this.saveSetting = this.saveSetting.bind(this);
    this.loadSetting = this.loadSetting.bind(this);
    this.clearDatabase = this.clearDatabase.bind(this);
  }

  componentWillMount() {
    this.bindBodyClass('setting');
  }

  componentDidMount() {
    super.componentDidMount();
    this.loadSetting();
  }

  changeState(prop, newValue) {
    var newState = this.state;

    newState.fields[prop].value = newValue;

    this.setState(newState);
  }

  loadSetting() {
    SettingStore.get().then((setting) => {
      this.state.fields.interval.value = setting.interval;
      this.state.fields.wait.value = setting.wait;

      this.setState(this.state);
    });
  }

  saveSetting() {
    SettingStore.update(new SettingModel({
      _id: 1,
      interval: parseInt(this.state.fields.interval.value),
      wait: parseInt(this.state.fields.wait.value)
    })).then(() => {
      SettingStore.preload();
      alert(CurrentLanguage.setting.message.success);
    });
  }

  clearDatabase() {
    var clearDbResult = confirm(CurrentLanguage.setting.message.clearDatabaseConfirm);

    if (clearDbResult === true) {
      var clearDatabase = new ClearDatabase();

      clearDatabase.removeAll().then(() => {
        alert(CurrentLanguage.setting.message.clearDatabase);
        remote.getCurrentWindow().reload();
      });
    }
  }

  render() {
    return (
      <div>
        <MenuBar ref="menuBar" visible={true} />
        <div className="ui one column center aligned grid">
          <div className="column ten wide">
            <h4 className="ui horizontal inverted divider">
              {CurrentLanguage.setting.title}
            </h4>
          </div>
          <div className="column fifteen wide">
            <div className="ui mini form">
              <div className="two fields">
                <div className="field">
                  <label>{CurrentLanguage.setting.interval.default}</label>
                  <div className="ui right labeled left icon input">
                    <i className="wait icon"></i>
                    <input placeholder="" type="number" valueLink={this.state.fields.interval} />
                    <div className="ui basic label">
                      mm
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label>{CurrentLanguage.setting.interval.wait}</label>
                  <div className="ui right labeled left icon input">
                    <i className="wait icon"></i>
                    <input placeholder="" type="number" valueLink={this.state.fields.wait} />
                    <div className="ui basic label">
                      mm
                    </div>
                  </div>
                </div>
              </div>
              <button className="ui labeled icon button red" onClick={this.clearDatabase}>
                <i className="trash icon"></i>
                {CurrentLanguage.setting.buttons.clearDatabase}
              </button>
              <div className="ui divider">
              </div>
              <button className="ui labeled icon button green" onClick={this.saveSetting}>
                <i className="save icon"></i>
                {CurrentLanguage.setting.buttons.save}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
