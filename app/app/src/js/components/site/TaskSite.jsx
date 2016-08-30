import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';
import { CurrentLanguage } from '../../config/lang';
import { TaskStore } from '../../stores/TaskStore';
import { TaskLogStore } from '../../stores/TaskLogStore';
import { SettingStore } from '../../stores/SettingStore';
import TaskModel from '../../models/Task';
import TaskLogModel from '../../models/TaskLog';
import TaskList from './timer/TaskList';
import BaseSite from './BaseSite';

import { Timer, TIMER_SETTINGS, TIMERSTATUS, TIMERSTAGE } from '../../helpers/Timer';
import { Toasty } from '../../helpers/Toasty';
import { WindowHelper } from '../../helpers/Window';
import { NotifyHelper } from '../../helpers/Notify';

class TaskSite extends BaseSite {
  static defaultProps = {
    displayName: 'TaskSite'
  }

  constructor(props, context) {
    super(props);

    var timer = new Timer(this.setting.interval * 60, TIMER_SETTINGS.interval);

    this.context = context;
    this.state = {
      timer: timer,
      task: this.props.location.state.task,
      history: undefined
    };

    this.state.maxCounter = timer.maxCounter;

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.setTaskStatusStyle = this.setTaskStatusStyle.bind(this);
    this.incrementMaxCounter = this.incrementMaxCounter.bind(this);
    this.decrementMaxCounter = this.decrementMaxCounter.bind(this);
    this.showCloseTaskModal = this.showCloseTaskModal.bind(this);
  }

  componentWillMount() {
    this.bindBodyClass('task');
  }

  componentDidMount() {
    super.componentDidMount();
    this.setTaskStatusStyle();
    this.loadCurrentTimer();
  }

  componentWillReceiveProps(nextProps) {
  }

  loadCurrentTimer() {
    var timer = this.state.timer.getCurrentTimer();
    var history = this.state.timer.getCurrentTimerHistory();

    if (history) {
      this.state.history = history;
    }

    if (timer) {
      this.state.timer = timer;

      if (this.state.timer.status === TIMERSTATUS.STARTED) {
        var resultContinueStartedTask = confirm(CurrentLanguage.alert.continueTask.title);

        if (resultContinueStartedTask === true) {
          this.startNewTimer(this.state.timer.counter);
        } else {
          this.state.history = undefined;
          this.state.timer = new Timer(this.setting.interval * 60, TIMER_SETTINGS.interval);
          this.state.timer.setCurrentTimer();
          this.state.timer.setCurrentTimerHistory(this.state.history);
        }
      }
    }
  }

  setTaskStatusStyle() {
    var styles = this.getTimerStyles();

    $('.main-container')
      .removeClass('waiting-status')
      .removeClass('play-status')
      .removeClass('stop-status')
      .addClass(styles.containerStatus);
  }

  getTimerStyles() {
    var styles = {
      play: 'circular ui icon button play massive inverted gray',
      stop: 'circular ui icon button stop massive inverted gray',
      pause: 'circular ui icon button pause massive inverted gray',
      progress: 'ui progress',
      containerStatus: ''
    };

    switch (this.state.timer.status) {
      case TIMERSTATUS.STOPPED:
        styles.pause += ' disabled';
        break;
      case TIMERSTATUS.PAUSED:
        styles.pause += ' disabled';
        break;
      case TIMERSTATUS.STARTED:
        styles.play += ' disabled';
        break;
    }

    switch (this.state.timer.stage) {
      case TIMERSTAGE.WAITING:
        styles.containerStatus = "waiting-status";
        styles.progress += ' pink';
        break;
      case TIMERSTAGE.STOPPED:
        styles.containerStatus = "stop-status";
        styles.progress += ' orange';
        break;
      default:
        styles.containerStatus = "play-status";
        styles.progress += ' blue';
        break;
    }

    return styles;
  }

  startTimer(counter) {
    if (this.state.timer.status !== TIMERSTATUS.STARTED) {
      switch (this.state.timer.stage) {
        case TIMERSTAGE.WAITING:
          this.startWait(counter);
          break;
        default:
          this.startNewTimer(counter);
          break;
      }
    }
  }

  startNewTimer(counter) {
    var isPaused = this.state.timer.status === TIMERSTATUS.PAUSED;
    var isRecoverStarted = this.state.timer.status === TIMERSTATUS.STARTED && this.state.timer.stage === TIMERSTAGE.STARTED;
    var timerCounter;

    if (!isPaused && !isRecoverStarted) {
      timerCounter = this.setting.interval * 60;
      this.state.timer.initialize(timerCounter);
      this.prepareTaskLog();
    } else {
      timerCounter = this.state.timer.counter;
    }

    this.state.timer.start({
      counter: timerCounter,
      done: () => {
        this.state.timer.removeCurrentTimer();
        this.state.timer.removeCurrentTimerHistory(this.state.history);
        this.state.timer.incrementCycleCounter();
        this.startWait();
        this.updateState({ timer: this.state.timer });
        this.saveTaskLog();
        this.state.history = undefined;
      },
      elapsed: (m) => {
        this.updateState({ timer: this.state.timer });
        this.state.timer.setCurrentTimer();
        this.prepareTaskLog();
      }
    });

    this.updateState({ timer: this.state.timer });

    if (!isPaused) {
      WindowHelper.minimize(2);
      Toasty.load('start');
      NotifyHelper.notifyStarted(this.state.timer.toMinutes());
    }
  }

  startWait() {
    var isPaused = this.state.timer.status === TIMERSTATUS.PAUSED;

    var additionaWaitTime = 1;
    var cycleCounter = this.state.timer.getCycleCounter();

    if(cycleCounter > 0 && cycleCounter % 3 === 0){
      additionaWaitTime = 3;
      this.state.timer.setCycleCounter(0);
    } 

    this.state.timer.wait({
      counter: this.setting.wait * 60 * additionaWaitTime,
      done: () => {
        this.state.timer.counter = this.setting.interval * 60;
        this.state.timer.maxCounter = this.setting.interval * 60;
        this.state.timer.counterValue = 0;

        this.updateState({ timer: this.state.timer });
      },
      elapsed: (m) => {
        this.updateState({ timer: this.state.timer });
      }
    });

    this.updateState({ timer: this.state.timer });

    if (!isPaused) {
      WindowHelper.restore();
      NotifyHelper.notifyTimeOver(this.state.timer.toMinutes());
      Toasty.load('wait');
    }
  }

  stopTimer() {
    if (this.state.timer.status === TIMERSTATUS.STARTED) {
      this.saveTaskLog();
      this.state.timer.stop();
      this.state.history = undefined;
      this.updateState({ timer: this.state.timer });
      NotifyHelper.notifyStopped();
      this.showCloseTaskModal();
    } else {
      this.context.router.push('/');
    }
  }

  pauseTimer() {
    if (this.state.timer.status === TIMERSTATUS.STARTED) {
      this.state.timer.pause();
      this.saveTaskLog();
      this.updateState({ timer: this.state.timer });
    }
  }

  updateState(arg) {
    arg = arg || {};

    this.state.timer = arg.timer || this.state.timer;
    this.state.task = arg.task || this.state.task;

    this.state.timer.update();

    this.setState({
      timer: this.state.timer,
      task: this.state.task
    });

    this.updateProgress();
  }

  updateProgress() {
    $(this.refs.progress).progress({
      total: this.state.timer.maxCounter,
      value: this.state.timer.counterValue
    });
  }

  incrementMaxCounter() {
    this.state.timer.maxCounter += 60;
    this.state.timer.counter = this.state.timer.maxCounter;
    this.updateState();
  }

  decrementMaxCounter() {
    if (this.state.timer.maxCounter - 60 > 0) {
      this.state.timer.maxCounter -= 60;
      this.state.timer.counter = this.state.timer.maxCounter;
      this.updateState();
    }
  }

  prepareTaskLog() {
    if (!this.state.history) {
      this.state.history = new TaskLogModel({
        task: this.state.task,
        timer: this.state.timer.counterValue
      });
    } else {
      this.state.history.timer = this.state.timer.counterValue;
      this.state.history.modified = new Date();
    }
  }

  saveTaskLog() {
    if (this.state.history._id) {
      TaskLogStore.update({ _id: this.state.history._id }, this.state.history).then(() => {
        this.state.timer.setCurrentTimerHistory(this.state.history);
      });
    } else {
      TaskLogStore.create(this.state.history).then((doc) => {
        this.state.history = doc;
        this.state.timer.setCurrentTimerHistory(this.state.history);
      });
    }
  }

  closeTask() {
    this.state.task.modified = new Date();
    this.state.task.completed = true;

    TaskStore.update(this.state.task).then(() => {
      this.context.router.push('/');
    });
  }

  showCloseTaskModal() {
    var closeTaskResult = confirm(CurrentLanguage.closeTask.title);

    if (closeTaskResult === true) {
      this.closeTask();
    }
  }

  render() {
    this.setTaskStatusStyle();

    var timerStyles = this.getTimerStyles();

    return (
      <div>
        <div className="ui centered aligned grid">
          <div className="column fourteen wide">
            <h4 className="ui horizontal inverted divider">
              {this.state.task.name}
            </h4>
          </div>
          <div className="column ten wide counter">
            <div className="ui inverted huge statistic">
              <div className="value">
                {this.state.timer.remaing}
              </div>
              <div className="label">
                Tempo
              </div>
            </div>
          </div>
          <div className="column row sixteen counter center">
            <button className="mini ui circular icon button white" onClick={this.decrementMaxCounter}>
              <i className="minus icon"></i>
            </button>
            <button className="mini ui circular icon button white" onClick={this.incrementMaxCounter}>
              <i className="plus icon"></i>
            </button>
          </div>
          <div className="column ten wide">
            <button className={timerStyles.play} onClick={this.startTimer}>
              <i className="play icon"></i>
            </button>
            &nbsp;
            <button className={timerStyles.stop} onClick={this.stopTimer}>
              <i className="stop icon"></i>
            </button>
            &nbsp;
            <button className={timerStyles.pause} onClick={this.pauseTimer}>
              <i className="pause icon"></i>
            </button>
          </div>
          <div className="column fourteen wide task-progress">
            <div className={timerStyles.progress} ref="progress">
              <div className="bar">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

TaskSite.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default TaskSite;
