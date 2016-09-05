/* eslint-disable */
const { app, BrowserWindow } = require('electron');  // Module to control application life.

var mainWindow = null;
var isDev = process.argv.indexOf('--dev') > -1;

function loadDev(mainWindow){
  mainWindow.webContents.openDevTools({ detach:true });
  require('devtron').install();
}

process.on('error', function(err) {
  console.log(err);
});

app.on('window-all-closed', () => {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 390, height: 600 });
  
  if(!isDev){    
    mainWindow.setMenu(null);
  } else {
    loadDev(mainWindow);
  }

  mainWindow.loadURL(`file://${__dirname}/main.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
