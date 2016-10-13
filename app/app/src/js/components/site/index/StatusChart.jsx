import $ from 'jquery';
import React from 'react';
import moment from 'moment';
import reactD3 from 'react-d3';
import d3 from 'd3';
import { CurrentLanguage } from '../../../config/lang';
import db from '../../../stores/StoreContext';

var BarChart = reactD3.BarChart;

class StatusChart extends React.Component {
  constructor(props, context) {
    super(props);

    this.context = context;

    this.state = {
      logs: [],
      xScale: null,
      xScaleBrush: null
    };

    this.getTaskData = this.getTaskData.bind(this);
    this.startChart = this.startChart.bind(this);
  }

  componentDidMount() {
    this.getTaskData();
  }

  getTaskData() {
    var start = moment().startOf('day').subtract(3, 'month');
    var end = moment();

    db.stores.taskLog.filterByDate(start.toDate(), end.toDate()).then(logs => {
      this.state.logs = logs;

      var data = {
        name: 'dia',
        values: []
      };

      var logsSummary = {};

      logs.forEach(log => {
        var label = moment(log.createAt).format('ddd');

        if (!logsSummary[label]) {
          logsSummary[label] = 0;
        }

        logsSummary[label] += log.timer
      });

      Object.keys(logsSummary).map((key, index) => {
        data.values.push({
          x: key,
          y: logsSummary[key]
        });
      });

      this.startChart([data]);
    });
  }

  startChart(data) {
    this.state.data = data;

    this.setState({
      data: data
    })
  }

  render() {
    var template;

    var data = this.state.data;
    var colors = d3.scale.ordinal().range(["#607D8B", "#CFD8DC"]);

    if (this.state.logs && data && data[0].values.length > 0) {

      template = (
        <BarChart
          data={data}
          width={350}
          height={200}
          fill={'#3182bd'}
          colors={colors}
          yAxisLabel={CurrentLanguage.index.chart.titleY}
          xAxisLabel={CurrentLanguage.index.chart.titleX}
          gridHorizontal={true}
          />
      );
    } else {
      template = (<div>
        <div className="ui pointing red basic label">
          {CurrentLanguage.index.emptyTaskStatus}
        </div>
      </div>);
    }

    return (
      <div>
        {template}
      </div>
    );
  }
};

export default StatusChart;