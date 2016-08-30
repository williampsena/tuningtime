import React from 'react';
import { Link, browserHistory } from 'react-router';
import { CurrentLanguage } from '../../../config/lang';
import { TaskStore } from '../../../stores/TaskStore';
import { TaskLogStore } from '../../../stores/TaskLogStore';

class EditTask extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      task: {}
    };

    this.state.fields = {
      taskName: { value: '', requestChange: (newValue) => { this.changeState('taskName', newValue); } }
    };

    this.saveTask = this.saveTask.bind(this);
  }

  componentWillMount() {
    this.prepareComponentState(this.props);
    this.prepareForm();
  }

  componentWillReceiveProps(nextProps) {
    this.prepareComponentState(nextProps);
  }

  prepareComponentState(props) {
    var newState = this.state;

    newState.task = props.task || {};
    
    this.closeEdit = props.closeEdit;
    this.updateGrid = props.updateGrid;

    if (props.task) {
      newState.fields.taskName.value = props.task.name;
    }

    this.setState(newState);
  }

  bindState(task) {
    this.state.task = task;
    this.state.fields.taskName.value = task.name;

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

  saveTask(e) {
    this.state.task.name = this.state.fields.taskName.value;
    this.setState(this.state);

    TaskStore.update(this.state.task).then(TaskLogStore.updateTask(this.state.task)).then(() => {
      alert(CurrentLanguage.taskManagement.messages.taskUpdated);
      this.closeEdit();
      this.updateGrid();
    });
  }

  changeState(prop, newValue) {
    var newState = this.state;

    newState.fields[prop].value = newValue;

    this.setState(newState);
  }

  render() {
    return (
      <div>
        <form className="ui form" ref="form">
          <div className="field">
            <label>{CurrentLanguage.taskManagement.form.taskName}</label>
            <input type="text" placeholder="" valueLink={this.state.fields.taskName} />
          </div>
          <button type="button" className="ui approve button green" onClick={this.saveTask}>
            <i className="save icon"></i>
            {CurrentLanguage.buttons.save}
          </button>
          <button type="button" className="ui cancel button red" onClick={this.closeEdit}>
            <i className="reply icon"></i>
            {CurrentLanguage.buttons.cancel}
          </button>
        </form>
      </div>
    );
  }
};

EditTask.contextTypes = {
  router: React.PropTypes.object
};

export default EditTask;