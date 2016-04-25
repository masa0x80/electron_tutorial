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
  var menuItems = [
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
      label: 'View',
      submenu: [
        {
          label:       'Reload',
          accelerator: 'CmdOrCtrl+R',
          click:       function() { mainWindow.webContents.executeJavaScript('document.getElementById("mainWebView").executeJavaScript("location.reload()")'); },
        }, {
          type: 'separator',
        },
      ],
    },
  ];

  if (process.platform == 'darwin') {
    menuItems.unshift({
      label: 'Electron',
      submenu: [
        {
          label:       'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click:       function() { app.quit(); },
        },
      ],
    });
    menuItems[2].submenu.push({
      label:       'History back',
      accelerator: 'Command+[',
      click:       function() { mainWindow.webContents.executeJavaScript('document.getElementById("mainWebView").executeJavaScript("history.back()")'); },
    }, {
      label:       'History forward',
      accelerator: 'Command+]',
      click:       function() { mainWindow.webContents.executeJavaScript('document.getElementById("mainWebView").executeJavaScript("history.forward()")'); },
    });

    var menu = Menu.buildFromTemplate(menuItems);
    Menu.setApplicationMenu(menu);
  } else {
    menuItems[1].submenu.push({
      label:       'History back',
      accelerator: 'Alt+Left',
      click:       function() { mainWindow.webContents.executeJavaScript('document.getElementById("mainWebView").executeJavaScript("history.back()")'); },
    }, {
      label:       'History forward',
      accelerator: 'Alt+Right',
      click:       function() { mainWindow.webContents.executeJavaScript('document.getElementById("mainWebView").executeJavaScript("history.forward()")'); },
    });

    var menu = Menu.buildFromTemplate(menuItems);
    mainWindow.setMenu(menu);
  }
};
