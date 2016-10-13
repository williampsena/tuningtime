import React from 'react';
import { Link, browserHistory } from 'react-router';
import { CurrentLanguage } from '../../../config/lang';
import db from '../../../stores/StoreContext';
import TaskModel from '../../../models/Task';

class CreateTask extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      task: {}
    };

    this.saveTask = this.saveTask.bind(this);
    this.show = this.show.bind(this);
    this.callbacks = {
      change: {
        taskName: (e) => { this.eventChange(e, (v) => { this.state.task.name = v; } )}
      }
    };
  }

  componentWillMount() {
    this.prepareComponentState(this.props);
    this.prepareForm();
  }

  componentWillReceiveProps(nextProps) {
    this.prepareComponentState(nextProps);
  }

  prepareComponentState(props) {
    this.setState({
      task: props.task || {}
    });
  }

  bindState(task) {
    this.state.task = task;
    this.setState(this.state);
  }

  prepareForm() {
    $(this.refs.form)
      .form({
        fields: {
          taskName: 'empty',
        }
      });
  }

  show() {
    $(this.refs.modal)
      .modal({
        detachable: false
      })
      .modal('show');
  }

  hide() {
    $(this.refs.modal)
      .modal('hide');
  }

  saveTask(e) {
    db.stores.task.create(new TaskModel(this.state.task)).then(task => {
      this.hide();
      this.redirect(task);
    });
  }

  redirect(task) {
    this.context.router.push({
      pathname: '/task',
      state: {
        task: task
      }
    });
  }

  getStoreState() {
    return {
      task: this.state.task || {}
    };
  }

  onStoreChange() {
    var newState = this.getStoreState();
    this.setState(newState);
  }

  eventChange(e, callback) {
    callback(e.target.value);
    this.onStoreChange();
    return true;
  }

  render() {
    return (
      <div ref="modal" className="ui modal">
        <div className="header">{CurrentLanguage.timer.title}</div>
        <div className="content">
          <form className="ui form" ref="form">
            <div className="field">
              <label>{CurrentLanguage.timer.form.taskName}</label>
              <input type="text" placeholder="" value={this.state.task.name} onChange={this.callbacks.change.taskName} />
            </div>
          </form>
        </div>
        <div className="actions">
          <button type="submit" className="ui button green" onClick={this.saveTask}>{CurrentLanguage.buttons.save}</button>
          <button className="ui cancel button red">{CurrentLanguage.buttons.cancel}</button>
        </div>
      </div>
    );
  }
};

CreateTask.contextTypes = {
  router: React.PropTypes.object
};

export default CreateTask;