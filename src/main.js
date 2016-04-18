'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var mainWindow = null;

app.on('window-all-closes', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width:  1200,
    height: 600,
    webPreferences: {
      'nodeIntegration': false
    }
  });

  mainWindow.loadURL('file://' + __dirname + '/html/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
