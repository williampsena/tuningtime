import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';
import { CurrentLanguage } from '../../config/lang';
import { TaskStore } from '../../stores/TaskStore';
import { TaskLogStore } from '../../stores/TaskLogStore';
import TaskModel from '../../models/Task';
import TaskLogModel from '../../models/TaskLog';
import TaskList from './taskManagement/TaskList';
import BaseSite from './BaseSite';
import MenuBar from './common/MenuBar';

class TaskManagement extends BaseSite {
  static defaultProps = {
    displayName: 'TaskManagement'
  }

  constructor(props, context) {
    super(props);

    this.context = context;
    this.state = {
    };
  }

  componentWillMount() {
    this.bindBodyClass('taskManagement');
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div>
        <div className="ui one column center aligned grid">
          <MenuBar ref="menuBar" visible={true} />
          <div className="column ten wide">
            <div className="ui large breadcrumb">
              <Link to="/" className="section">
                Home
              </Link>
              <i className="right chevron icon divider"></i>
              <div className="active section">{CurrentLanguage.taskManagement.title}</div>
            </div>
          </div>
          <div className="column twelve wide">
            <TaskList />
          </div>
        </div>
      </div >
    );
  }
};

TaskManagement.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default TaskManagement;
