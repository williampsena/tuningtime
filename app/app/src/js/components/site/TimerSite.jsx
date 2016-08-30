import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';
import { TaskStore } from '../../stores/TaskStore';
import TaskList from './timer/TaskList';
import MenuBar from './common/MenuBar';
import BaseSite from './BaseSite';
import CreateTask from './timer/CreateTask';
import { CurrentLanguage } from '../../config/lang';

export default class TimerSite extends BaseSite {
  static defaultProps = {
    displayName: 'TimerSite'
  }

  constructor(props) {
    super(props);

    this.state = {};
    this.state = this.getStoreState();
    this.searchTasks = this.searchTasks.bind(this);
    this.eventSearchTasks = this.eventSearchTasks.bind(this);
    this.changeTaskStatus = this.changeTaskStatus.bind(this);
    this.createTask = this.createTask.bind(this);
  }

  componentWillMount() {
    this.bindBodyClass('timer');

    setTimeout(() => {
      this.searchTasks().then(source => {      
        this.state.tasks = source;
        this.onStoreChange();      
          this.state.loading = false;
          this.onStoreChange();

      });
    }, 500);
  }

  componentDidMount() {
  }

  getStoreState() {
    return {
      init: this.state.init || false,
      task: this.state.task || '',
      tasks: this.state.tasks || [],
      filter: this.state.filter || {
        onlyOpenedTask: true
      },
      loading: (typeof this.state.loading === 'undefined') ? true : this.state.loading
    };
  }

  onStoreChange() {
    var newState = this.getStoreState();
    this.setState(newState);
  }

  eventSearchTasks(e) {
    this.state.task = e.target.value;
    this.onStoreChange();
    this.bindSearchTasks();
    return true;
  }

  searchTasks() {
    return TaskStore.findByContent(this.state.task, !this.state.filter.onlyOpenedTask);
  }

  bindSearchTasks() {
    return this.searchTasks().then(source => {
      this.state.tasks = source;
      this.onStoreChange();
    });
  }

  changeTaskStatus(e) {
    this.state.filter.onlyOpenedTask = e.target.checked;
    this.onStoreChange();
    this.bindSearchTasks();
    return true;
  }

  createTask(e) {
    this.refs.createTaskModal.show();
  }

  render() {
    var disabledActions = "disabled";
    var template;

    if (this.state.loading === true) {
      return (<div className="loading">
        <div className="ui active inline loader massive"></div>
    </div>);
    } else {
      template = (
        <div className="ui grid center aligned ">
          <div className="fourteen wide column">
            <div className="ui breadcrumb">
              <Link to="/" className="section">
                Home
              </Link>
              <i className="right chevron icon divider"></i>
              <div className="active section">{CurrentLanguage.timer.title}</div>
            </div>
          </div>
          <div className="fourteen wide column">
            <form className="ui form">
              <div className="field">
                <div className="ui fluid icon input small">
                  <input ref="task" placeholder={CurrentLanguage.timer.filter.placeHolderTask} onChange={this.eventSearchTasks} type="text" value={this.state.task} />
                  <i className="search icon"></i>
                </div>
              </div>
              <div className="field">
                <div className="ui toggle checkbox small">
                  <input name="onlyOpenedTask" checked={this.state.filter.onlyOpenedTask} type="checkbox" onChange={this.changeTaskStatus} />
                  <label>{CurrentLanguage.timer.filter.onlyOpenedTask}</label>
                </div>
              </div>
              <button className="ui green icon button small" title={CurrentLanguage.timer.buttons.addTask} onClick={this.createTask}>
                <i className="add icon"></i>
                Nova atividade
              </button>
            </form>
          </div>
          <div className="fourteen wide column">
            <TaskList tasks={this.state.tasks} />
          </div>
        </div>
      );
    }

    return (
      <div>
        <MenuBar visible={true} />
        <div className="pusher">
          {template}
          <CreateTask ref="createTaskModal" />
        </div>
      </div>
    );
  }
};
