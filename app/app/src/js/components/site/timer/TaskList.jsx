import React from 'react';
import { Link, browserHistory } from 'react-router';
import Griddle from 'griddle-react';
import { CurrentLanguage } from '../../../config/lang';

class TaskList extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      tasks: [],
      columns: [
          {
            columnName: 'name',
            displayName: CurrentLanguage.timer.taskList.columns.name.label,
            order: 1,
            locked: false,
            visible: true
          }
      ]
    };

    this.play = this.play.bind(this);
    this.selectTask = this.selectTask.bind(this);
  }

  componentWillMount() {
    this.prepareComponentState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.prepareComponentState(nextProps);
  }

  prepareComponentState(props) {
    this.setState({
      tasks: props.tasks || []
    });
  }

  selectTask(gridRow, event){
    var task = gridRow.props.data;
    this.play(task);
  }

  play(task) {
    this.context.router.push({
      pathname: '/task',
      state: {
        task: task
      }
    });
  }

  render() {
    if (this.state.tasks.length == 0) {
      return (<div></div>);
    }

    return (
      <div>
        <Griddle results={this.state.tasks} 
                tableClassName="ui very basic selectable table small"
                columnMetadata={this.state.columns}
                columns={["name"]}
                resultsPerPage={5}
                uniqueIdentifier="id"
                useGriddleStyles={false}
                noDataMessage={CurrentLanguage.grid.empty}
                onRowClick={this.selectTask} />
      </div>
    );
  }
};

TaskList.contextTypes = {
  router: React.PropTypes.object
};

export default TaskList;