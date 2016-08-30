import React from 'react';
import TaskSite from '../site/TaskSite';

export default class TaskApp extends React.Component {
  static defaultProps = {
    displayName: 'TaskSite'
  }
  
  constructor(props, context) {
    super(props);
  }
  
  render() {
    return (
      <TaskSite location={this.props.location} />
    );
  }
};
