import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';
import { CurrentLanguage } from '../../config/lang';
import db from '../../stores/StoreContext';
import BaseSite from './BaseSite';
import MenuBar from './common/MenuBar';
import fs from 'fs';
import js2xmlparser from 'js2xmlparser';
import path from 'path';

var os = require("os");

const {dialog} = require('electron').remote;

class ExportSite extends BaseSite {
  static defaultProps = {
    displayName: 'ExportSite'
  }

  constructor(props, context) {
    super(props);

    this.context = context;
    this.state = {};
    this.state = this.getStoreState();

    this.exportToFile = this.exportToFile.bind(this);
  }

  componentWillMount() {
    this.bindBodyClass('export');
  }

  componentDidMount() {
    super.componentDidMount();

    $('.ui.form')
      .form({
        fields: {
          startFilter: 'empty',
          endFilter: 'empty'
        }
      });
  }

  getStoreState() {
    return {
      startFilter: this.state.startFilter || new Date(),
      endFilter: this.state.endFilter || new Date(),
      fileType: this.state.fileType || 'xml'
    };
  }

  onStoreChange() {
    var newState = this.getStoreState();
    this.setState(newState);
  }

  eventChangeState(e, field) {
    this.state[field] = e.target.value;
    this.onStoreChange();
    return true;
  }

  exportToXml(logsModels, filename) {
    var xmlModels = {
      tasks: logsModels.map(m => {
        var model = {
          "@": {
            id: m.id,
            completed: m.completed,
            modified: m.modified,
            name: m.name,
            timer: m.timer
          },
          logs: m.logs.map(lm => {
            return {
              "@": {
                timer: lm.timer,
                date: lm.date
              }
            }
          })
        };

        return model;
      })
    };

    var xml = js2xmlparser("tasks", xmlModels);

    fs.writeFileSync(filename, xml, 'utf8');
  }

  exportToJson(logsModels, filename) {
    var model = {
      tasks: logsModels.map(m => {
        return {
          id: m.id,
          completed: m.completed,
          modified: m.modified,
          name: m.name,
          timer: m.timer,
          logs: m.logs.map(lm => {
            return {
              timer: lm.timer,
              date: lm.date
            };
          })
        };
      })
    };

    var json = JSON.stringify(model, null, 2);

    fs.writeFileSync(filename, json, 'utf8');
  }

  exportToText(logsModels, filename) {
    var textModels = '';

    logsModels.forEach(m => {
      m.logs.forEach(l => {
        //
        // Prepare text content file
        //
        textModels += [
          String(m.id),
          String(m.completed),
          String(m.modified),
          m.name,
          String(m.timer),
          String(l.timer),
          String(l.date)
        ].join('|').concat(os.EOL);
      });
    });

    fs.writeFileSync(filename, textModels, 'utf8');
  }

  exportToFile() {
    this.getModels().then(logs => {
      dialog.showSaveDialog(null, {
        title: 'Exportação', filters: []
      }, (filename) => {
        if (!filename) {
          return;
        }

        switch (this.state.fileType) {
          case "txt":
            this.exportToText(logs, filename);
            break;
          case "json":
            this.exportToJson(logs, filename);
            break;
          default:
            this.exportToXml(logs, filename);
            break;
        }
      });
    });
  }

  getModels() {
    return db.stores.taskLog.filterByDate(new Date(this.state.startFilter), new Date(this.state.endFilter)).then(logs => {
      var tasks = new Map();

      logs.forEach(log => {
        let task = tasks.get(log.task.id);
        let newTaskLog = { timer: log.timer, date: log.createAt };

        if (!task) {
          task = log.task;
          task.logs = [newTaskLog];
          task.timer = log.timer;
        } else {
          task.logs.push(newTaskLog);
          task.timer += log.timer;
        }

        tasks.set(log.task.id, task);
      });

      var models = [];

      tasks.forEach((value, key) => models.push(value));

      return models;
    });
  }

  render() {
    return (
      <div>
        <MenuBar ref="menuBar" visible={true} />
        <div className="ui centered aligned grid">
          <div className="column ten wide">
            <div className="ui large breadcrumb">
              <Link to="/" className="section">
                Home
              </Link>
              <i className="right chevron icon divider"></i>
              <div className="active section">{CurrentLanguage.exportFile.title}</div>
            </div>
          </div>
          <div className="column ten wide">
            <form className="ui form">
              <div className="field">
                <label>Período</label>
                <div className="two fields">
                  <div className="field">
                    <input placeholder="Data inicial" type="date" ref="startFilter" name="startFilter" onBlur={(e) => this.eventChangeState.call(this, e, 'startFilter') } />
                  </div>
                  <div className="field">
                    <input placeholder="Data Final" type="date" ref="endFilter" name="endFilter" onBlur={(e) => this.eventChangeState.call(this, e, 'endFilter') }  />
                  </div>
                </div>
              </div>

              <div className="grouped fields">
                <label>Tipo do arquivo?</label>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" name="fileType" checked={this.state.fileType == 'xml'} value="xml" onChange={(e) => this.eventChangeState.call(this, e, 'fileType') } />
                    <label>Xml</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" name="fileType" checked={this.state.fileType == 'json'} value="json" onChange={(e) => this.eventChangeState.call(this, e, 'fileType') } />
                    <label>Json</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input type="radio" name="fileType" checked={this.state.fileType == 'txt'} value="txt" onChange={(e) => this.eventChangeState.call(this, e, 'fileType') } />
                    <label>Text</label>
                  </div>
                </div>
              </div>
              <div className="ui clearing divider"></div>
              <br />
              <div className="column ten wide">
                <div className="ui grid centered">
                  <button type="submit" className="ui circular icon button huge green" onClick={this.exportToFile}>
                    <i className="download icon"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

ExportSite.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default ExportSite;
