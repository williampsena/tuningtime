import React from 'react';
import { Link, browserHistory } from 'react-router';
import { CurrentLanguage } from '../../../config/lang';
import db from '../../../stores/StoreContext';
import EditTask from './EditTask';
import Griddle from 'griddle-react';

class TaskList extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {};
    this.state = this.getStoreState();
    this.searchTasks = this.searchTasks.bind(this);
    this.eventChangeTaskStatus = this.eventChangeTaskStatus.bind(this);
    this.eventSearchTasks = this.eventSearchTasks.bind(this);
  }

  componentWillMount() {
    this.prepareComponentState(this.props);
    this.bindSearchTasks();

    $('.menu .item').tab();
  }

  componentWillReceiveProps(nextProps) {
    this.prepareComponentState(nextProps);
  }

  prepareComponentState(props) {
    var state = this.getStoreState();
    state.tasks = props.tasks || [];
    this.setState(state);
  }

  getStoreState() {
    return {
      tasks: this.state.tasks || [],
      searchTask: this.state.searchTask || '',
      onlyOpenedTask: (typeof this.state.onlyOpenedTask === 'boolean') ? this.state.onlyOpenedTask : true
    };
  }

  onStoreChange() {
    var newState = this.getStoreState();
    this.setState(newState);
  }

  eventChangeTaskStatus(e) {
    this.state.onlyOpenedTask = e.target.checked;
    this.onStoreChange();
    this.bindSearchTasks();
    return true;
  }

  eventSearchTasks(e) {
    this.state.searchTask = e.target.value;
    this.onStoreChange();
    this.bindSearchTasks();
    return true;
  }

  bindSearchTasks() {
    return this.searchTasks().then(source => {
      this.state.tasks = source;
      this.onStoreChange();
    });
  }

  searchTasks() {
    return db.stores.task.findByContent(this.state.searchTask, !this.state.onlyOpenedTask);
  }

  delete(task) {
    var message = CurrentLanguage.taskManagement.messages.confirmTaskDelete.replace('{task}', task.name);
    var deleteTask = confirm(message);

    if (deleteTask === true) {
      db.stores.task.remove({ id: task.id }).then(() => {
        this.bindSearchTasks();
      });
    }
  }

  edit(task) {
    this.state.task = task;
    this.setState(this.state);
  }

  closeEdit() {
    this.state.task = undefined;
    this.setState(this.state);
  }

  render() {
    var styles = {
      filter: 'ui tab segment',
      form: 'ui tab segment'
    };

    if (this.state.task) {
      styles.form = + ' active';
    } else {
      styles.filter = + ' active';
    }

    var RowComponent = React.createClass({
      render: function () {
        var parent = this.props.metadata.customProperties.parent;
        var task = this.props.rowData;

        return (<div className="ui grid">
          <div className="ten wide column">
            <label>{this.props.data}</label>
          </div>
          <div className="five wide column">
            <button className="mini ui icon button violet" onClick={() => parent.edit(task)}>
              <i className="edit icon"></i>
            </button>
            <button className="mini ui icon button red" onClick={() => parent.delete(task)}>
              <i className="trash icon"></i>
            </button>
          </div>
        </div>);
      }
    });

    var columnMetadata = [
      {
        columnName: 'name',
        displayName: CurrentLanguage.timer.taskList.columns.name.label,
        order: 1,
        locked: false,
        visible: true,
        customComponent: RowComponent,
        customProperties: {
          parent: this
        }
      }
    ];

    return (
      <div id="taskList">
        <div className="ui pointing secondary menu">
          <a className="item active">Filtro</a>
          <a className="item">Cadastro</a>
        </div>
        <div className={styles.filter} data-tab="filter">
          <Griddle results={this.state.tasks}
            tableClassName="table"
            columnMetadata={columnMetadata}
            columns={["name"]}
            resultsPerPage={5}
            useGriddleStyles={false}
            tableClassName="ui very basic selectable table small"
            noDataMessage={CurrentLanguage.grid.empty}
            onRowClick={this.selectTask} />
        </div>
        <div className={styles.form} data-tab="form">
          <EditTask task={this.state.task} closeEdit={this.closeEdit.bind(this) } updateGrid={this.bindSearchTasks.bind(this)} />
        </div>
      </div>
    );
  }
};

TaskList.contextTypes = {
  router: React.PropTypes.object
};

export default TaskList;