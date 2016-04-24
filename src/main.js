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

  buildMenu(mainWindow);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

var buildMenu = function(mainWindow) {
  var Menu = require('menu');
  if (process.platform == 'darwin') {
    var menu = Menu.buildFromTemplate([
      {
        label: 'Electron',
        submenu: [
          {
            label:       'Quit',
            accelerator: 'Command+Q',
            click:       function() { app.quit(); }
          }
        ]
      }, {
        label: 'View',
        submenu: [
          {
            label:       'Reload',
            accelerator: 'Command+R',
            click:       function() { mainWindow.webContents.executeJavaScript('document.getElementById("mainWebView").executeJavaScript("location.reload()")'); }
          }, {
            label:       'History back',
            accelerator: 'Command+[',
            click:       function() { mainWindow.webContents.executeJavaScript('document.getElementById("mainWebView").executeJavaScript("history.back()")'); }
          }, {
            label:       'History forward',
            accelerator: 'Command+]',
            click:       function() { mainWindow.webContents.executeJavaScript('document.getElementById("mainWebView").executeJavaScript("history.forward()")'); }
          }
        ]
      }
    ]);
    Menu.setApplicationMenu(menu);
  } else {
    var menu = Menu.buildFromTemplate([
      {
        label: '&View',
        submenu: [
          {
            label:       '&Reload',
            accelerator: 'Ctrl+R',
            click:       function() { mainWindow.reload(); }
          }, {
            label:       'History back',
            accelerator: 'Alt+Left',
            click:       function() { mainWindow.webContents.executeJavaScript('document.getElementById("mainWebView").executeJavaScript("history.back()")'); }
          }, {
            label:       'History forward',
            accelerator: 'Alt+Right',
            click:       function() { mainWindow.webContents.executeJavaScript('document.getElementById("mainWebView").executeJavaScript("history.forward()")'); }
          }
        ]
      }
    ]);
    mainWindow.setMenu(menu);
  }
};
