/* eslint-disable */
const { BrowserWindow, screen: electronScreen } = require('electron').remote;
const {width, height} = electronScreen.getPrimaryDisplay().size;
import path from 'path';
import electron from 'electron';

const {app} = require('electron').remote;

let toastyWindow;

let toastyWidth = 200;
let toastyHeight = 200;
let x = width - (toastyWidth + 50);
let y = height - (toastyHeight + 50);

export class Toasty {
  static load(imageType) {
    this.closeWindow();
    
    if (toastyWindow) {
      toastyWindow.reload();
      toastyWindow.hide();
    } else {
      toastyWindow = new BrowserWindow({
        width: toastyWidth,
        height: toastyHeight,
        x: x,
        y: y,
        frame: false,
        movable: false,
        minimizable: false,
        maximizable: false,
        alwaysOnTop: true
      });
      
      console.log(`file://${app.getAppPath()}/main.html#/toasty?imageType=${imageType}`);
      toastyWindow.loadURL(`file://${app.getAppPath()}/main.html#/toasty?imageType=${imageType}`);
    }
    
    Toasty.animate(6);
    Toasty.close(7);
  }

  static animate(timeout) {
    timeout = timeout || 0;
    var timeoutMs = timeout * 1000;
    
    setTimeout(() => {
      Toasty.close();
    }, timeoutMs);
  }
  
  static close(timeout) {
    timeout = timeout || 0;
    var timeoutMs = timeout * 1000;
    
    if(toastyWindow) {
      setTimeout(() => {
        if(toastyWindow){
          toastyWindow.destroy();
          toastyWindow = undefined;
        }
      }, timeoutMs);
    }
  }
  
  static closeWindow(id) {
    var windows = BrowserWindow.getAllWindows();
    windows.shift();
    
    windows.forEach(w => w.close());
  }
};