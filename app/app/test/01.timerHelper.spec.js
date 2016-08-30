'use strict';
var chalk = require('chalk');
const timeInterval = 1000; // 1000 mili
const maxInterval = 4; // 4 sec
const waitInterval = 2; // 2 sec

const TIMERSTATUS = {
  STARTED: 1,
  WAITING: 2,
  STOPPED: 3
}

class ModelTimer {
  constructor(counter) {
    this.counter = counter - 1; //Remove 1 counter because zero is not be considered in interval
    this.status = TIMERSTATUS.STOPPED;
    this.process = null;
  }

  elapsed(done, elapsed) {
    done = done || function() {};
    
    console.log(chalk.green(`Elapsed [counter = ${this.counter}]`));
    
    if(elapsed){
      elapsed(this);
    }

    if (this.counter == 0) {
      this.stop();
      done();
      return;
    }

    this.status = TIMERSTATUS.STARTED;
    this.counter--;
  }
  
  start(args) {
    args = args || {};
    args.done = args.done || function () {};
    args.elapsed = args.elapsed || function () {};
  
    this.process = setInterval(this.elapsed.bind(this, args.done, args.elapsed), timeInterval);
  }
  
  stop() {
    console.log(chalk.red('Stopped'));
    
    this.status = TIMERSTATUS.STOPPED;
    clearInterval(this.process);
    this.process = null;
  }
  
  wait(args) {
    console.log(chalk.yellow(`Waiting [counter = ${this.counter}]`));
    
    args = args || {};
    args.done = args.done || function () {};
    args.elapsed = args.elapsed || function () {};

    this.process = setInterval(this.elapsed.bind(this, args.done, args.elapsed, TIMERSTATUS.WAITING), timeInterval);
  }
};

//
// Timer process
//
describe('T1 - Timer helper', () => {
  beforeEach(() => {
  });

  it('T1.01 - As a user I want to start a new cycle', (done) => {
    var model = new ModelTimer(maxInterval, timeInterval);
    model.start({
      done: () => done()
    });
  }).timeout(5000);

  it('T1.02 - As a user I want start a new cycle and stop', (done) => {
    var model = new ModelTimer(maxInterval, timeInterval);
    
    model.start();
    
    function cancelTimer() {
      model.stop();
      done();
    }
    
    cancelTimer.bind(this);
    
    setTimeout(cancelTimer, 2000);
    
  }).timeout(5000);
  
  it('T1.03 - As a user I want start a new cycle, pause and stop', (done) => {
    var model = new ModelTimer(maxInterval, timeInterval);
 
    model.start({
      done: () => {
        model.wait({
          done: () => done()
        })
      }
    });
    
  }).timeout(10000);
});