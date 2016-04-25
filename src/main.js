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
            accelerator: 'CmdOrCtrl+Q',
            click:       function() { app.quit(); },
          },
        ],
      }, {
        label: 'Edit',
        submenu: [
          {
            label:       'Undo',
            accelerator: 'CmdOrCtrl+Z',
            click:       function() { mainWindow.webContents.undo(); },
          }, {
            label:       'Redo',
            accelerator: 'Shift+CmdOrCtrl+Z',
            click:       function() { mainWindow.webContents.redo(); },
          }, {
            type: 'separator',
          }, {
            label:       'Copy',
            accelerator: 'CmdOrCtrl+C',
            click:       function() { mainWindow.webContents.copy(); },
          }, {
            label:       'Paste',
            accelerator: 'CmdOrCtrl+V',
            click:       function() { mainWindow.webContents.paste(); },
          }, {
            label:       'Cut',
            accelerator: 'CmdOrCtrl+X',
            click:       function() { mainWindow.webContents.cut(); },
          }, {
            type: 'separator',
          }, {
            label:       'Select All',
            accelerator: 'CmdOrCtrl+A',
            click:       function() { mainWindow.webContents.selectAll(); },
          },
        ],
      }, {
        label: 'View',
        submenu: [
          {
            label:       'Reload',
            accelerator: 'CmdOrCtrl+R',
            click:       function() { mainWindow.webContents.executeJavaScript('document.getElementById("mainWebView").executeJavaScript("location.reload()")'); },
          }, {
            type: 'separator',
          }, {
            label:       'History back',
            accelerator: 'Command+[',
            click:       function() { mainWindow.webContents.executeJavaScript('document.getElementById("mainWebView").executeJavaScript("history.back()")'); },
          }, {
            label:       'History forward',
            accelerator: 'Command+]',
            click:       function() { mainWindow.webContents.executeJavaScript('document.getElementById("mainWebView").executeJavaScript("history.forward()")'); },
          },
        ],
      },
    ]);
    Menu.setApplicationMenu(menu);
  } else {
    var menu = Menu.buildFromTemplate([
      {
        label: 'Edit',
        submenu: [
          {
            label:       'Undo',
            accelerator: 'CmdOrCtrl+Z',
            click:       function() { mainWindow.webContents.undo(); },
          }, {
            label:       'Redo',
            accelerator: 'Shift+CmdOrCtrl+Z',
            click:       function() { mainWindow.webContents.redo(); },
          }, {
            type: 'separator',
          }, {
            label:       'Copy',
            accelerator: 'CmdOrCtrl+C',
            click:       function() { mainWindow.webContents.copy(); },
          }, {
            label:       'Paste',
            accelerator: 'CmdOrCtrl+V',
            click:       function() { mainWindow.webContents.paste(); },
          }, {
            label:       'Cut',
            accelerator: 'CmdOrCtrl+X',
            click:       function() { mainWindow.webContents.cut(); },
          }, {
            type: 'separator',
          }, {
            label:       'Select All',
            accelerator: 'CmdOrCtrl+A',
            click:       function() { mainWindow.webContents.selectAll(); },
          },
        ],
      }, {
        label: '&View',
        submenu: [
          {
            label:       '&Reload',
            accelerator: 'CmdOrCtrl+R',
            click:       function() { mainWindow.reload(); },
          }, {
            type: 'separator',
          }, {
            label:       'History back',
            accelerator: 'Alt+Left',
            click:       function() { mainWindow.webContents.executeJavaScript('document.getElementById("mainWebView").executeJavaScript("history.back()")'); },
          }, {
            label:       'History forward',
            accelerator: 'Alt+Right',
            click:       function() { mainWindow.webContents.executeJavaScript('document.getElementById("mainWebView").executeJavaScript("history.forward()")'); },
          },
        ],
      },
    ]);
    mainWindow.setMenu(menu);
  }
};
