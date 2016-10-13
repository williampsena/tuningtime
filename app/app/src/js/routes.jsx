import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'components/App';
import IndexApp from 'components/app/IndexApp';
import WelcomeApp from 'components/app/WelcomeApp';
import TimerApp from 'components/app/TimerApp';
import TaskApp from 'components/app/TaskApp';
import ToastyApp from 'components/app/ToastyApp';
import ExportApp from 'components/app/ExportApp';
import TaskManagementApp from 'components/app/TaskManagementApp';
import SettingApp from 'components/app/SettingApp';
import AboutApp from 'components/app/AboutApp';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={WelcomeApp} />
    <Route name="index" path="/home" component={IndexApp} />
    <Route name="timer" path="/timer" component={TimerApp} />
    <Route name="task" path="/task" component={TaskApp} />
    <Route name="toasty" path="/toasty" component={ToastyApp} />
    <Route name="export" path="/export" component={ExportApp} />
    <Route name="setting" path="/setting" component={SettingApp} />
    <Route name="about" path="/about" component={AboutApp} />
    <Route name="taskManagement" path="/taskManagement" component={TaskManagementApp} />
  </Route>
);
