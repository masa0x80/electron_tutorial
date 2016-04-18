'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var mainWindow = null;

app.on('window-all-closes', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    center: true,
  });

  mainWindow.loadURL('file://' + __dirname + '/html/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
