import { SessionHelper, SessionLocalHelper } from './Session';
import TaskModel from '../models/Task';
import TaskLogModel from '../models/TaskLog';

export const TIMER_SETTINGS = {
  interval: 1000, // 1000 mili
  max: 10, // 4 sec
  wait: 20 // 2 sec
};

export const TIMERSTAGE = {
  STARTED: 1,
  WAITING: 2,
  STOPPED: 3
};

export const TIMERSTATUS = {
  STARTED: 1,
  STOPPED: 3,
  PAUSED: 2
};

const TIMER_SESSION_KEY = 'tuningtimer.currentTimer';
const TIMER_HISTORY_SESSION_KEY = 'tuningtimer.currentTimerHistory';
const TIMER_CYCLECOUNTER = 'tuningtimer.cycleCounter';

export class Timer {
  constructor(counter) {
    this.initialize(counter);
  }

  initialize(counter) {
    this.maxCounter = counter;
    this.counter = counter;
    this.counterValue = 0;
    this.status = TIMERSTATUS.STOPPED;
    this.stage = TIMERSTAGE.STOPPED;
    this.process = null;
    this.isWaiting = false;
    this.update();
  }

  update() {
    this.remaing = this.formatTimer();
  }

  elapsed(done, elapsed, stage) {
    done = done || function () { };

    if (elapsed) {
      elapsed(this);
    }

    if (this.counter == 0) {
      this.stop();
      done();
      done = () => {};
      return;
    }

    this.stage = stage;
    this.counter--;
    this.counterValue = this.maxCounter - this.counter;
    this.update();
  }

  start(args) {
    this.isWaiting = false;

    args = args || {};
    args.done = args.done || function () { };
    args.elapsed = args.elapsed || function () { };
    args.counter = args.counter || TIMER_SETTINGS.max;

    this.counter = args.counter;
    this.maxCounter = this.counter;
    this.counterValue = 0;
    this.update();

    this.process = setInterval(this.elapsed.bind(this, args.done, args.elapsed, TIMERSTAGE.STARTED), TIMER_SETTINGS.interval);
    this.stage = TIMERSTAGE.STARTED;
    this.status = TIMERSTATUS.STARTED;

    this.listenPlayAudio();
  }

  stop() {
    this.status = TIMERSTATUS.STOPPED;
    this.stage = TIMERSTAGE.STOPPED;
    clearInterval(this.process);
    this.process = null;
    this.counter = this.maxCounter;
    this.counterValue = 0;
    this.update();
    this.removeCurrentTimer();
  }

  pause() {
    this.status = TIMERSTATUS.PAUSED;
    clearInterval(this.process);
    this.process = null;
  }

  wait(args) {
    args = args || {};
    args.done = args.done || function () { };
    args.elapsed = args.elapsed || function () { };
    args.counter = args.counter || TIMER_SETTINGS.wait;

    this.counter = args.counter;
    this.maxCounter = this.counter;
    this.counterValue = 0;
    this.update();

    this.process = setInterval(this.elapsed.bind(this, args.done, args.elapsed, TIMERSTAGE.WAITING), TIMER_SETTINGS.interval);
    this.stage = TIMERSTAGE.WAITING;
    this.status = TIMERSTATUS.STARTED;

    this.listenWaitAudio();
  }

  setCurrentTimer() {
    SessionLocalHelper.create(TIMER_SESSION_KEY, this);
  }

  removeCurrentTimer() {
    SessionLocalHelper.remove(TIMER_SESSION_KEY);
  }

  getCurrentTimer() {
    var timer;
    var timerSession = SessionLocalHelper.get(TIMER_SESSION_KEY);

    if (timerSession) {
      timer = new Timer(timerSession.counter);
      timer.stage = timerSession.stage;
      timer.status = timerSession.status;
    }

    return timer;
  }

  setCurrentTimerHistory(model) {
    SessionLocalHelper.create(TIMER_HISTORY_SESSION_KEY, model);
  }

  removeCurrentTimerHistory() {
    SessionLocalHelper.remove(TIMER_HISTORY_SESSION_KEY);
  }

  getCurrentTimerHistory() {
    var timerHistory = SessionLocalHelper.get(TIMER_HISTORY_SESSION_KEY);

    if (!timerHistory) {
      timerHistory = new TaskLogModel();
    }

    return timerHistory;
  }

  formatTimer() {
    var pad = "00";
    var minutes = String(Math.trunc(this.counter / 60));
    var seconds = String(Math.round(this.counter % 60, 2));

    minutes = pad.substring(0, pad.length - minutes.length) + minutes;
    seconds = pad.substring(0, pad.length - seconds.length) + seconds;

    return minutes.concat(":", seconds);
  }

  toMinutes(counter){
    counter = counter || this.maxCounter || this.counter;
    
    var minutes = String(Math.round(counter / 60, 2));
    return minutes;
  }

  listenPlayAudio() {
    this.listenAudio('play', 0.2);
  }

  listenWaitAudio() {
    this.listenAudio('wait', 1);
  }

  listenAudio(audio, vol) {
    var audio = new Audio(`audio/${audio}.mp3`);
    audio.volume = vol || 0.2;
    audio.currentTime = 0;
    audio.play();
  }

  getCycleCounter(){
    return parseInt(SessionHelper.get(TIMER_CYCLECOUNTER)) || 0;
  }

  incrementCycleCounter(){
    var counter = this.getCycleCounter();

    counter = counter + 1;

    SessionHelper.create(TIMER_CYCLECOUNTER, String(counter));
  }

  setCycleCounter(counter){
    if(typeof counter === "number"){
      console.log(String(counter));

      SessionHelper.create(TIMER_CYCLECOUNTER, String(counter));
    }
  }
};