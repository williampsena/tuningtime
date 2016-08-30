/* eslint-disable */
const { app, BrowserWindow } = require('electron');  // Module to control application life.

var mainWindow = null;
var isDev = process.argv.indexOf('--dev');

process.on('error', function(err) {
  console.log(err);
});

app.on('window-all-closed', () => {
  if (process.platform != 'darwin')
    app.quit();
});

if(isDev){
  app.commandLine.appendSwitch('remote-debugging-port', '6001');
  app.commandLine.appendSwitch('enable-logging', 'true');
}

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 390, height: 600 });
  
  if(!isDev){
    mainWindow.setMenu(null);
  }

  mainWindow.loadURL('file://' + __dirname + '/dist/main.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
