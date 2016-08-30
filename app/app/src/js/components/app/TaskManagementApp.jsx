import React from 'react';
import TaskManagement from '../site/TaskManagement';

export default class TaskManagementApp extends React.Component {
  static defaultProps = {
    displayName: 'TaskManagement'
  }
  
  constructor(props, context) {
    super(props);
  }
  
  render() {
    return (
      <TaskManagement location={this.props.location} />
    );
  }
};
