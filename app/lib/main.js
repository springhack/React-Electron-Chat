'use strict';

var _electron = require('electron');

var DEV = process.env.DEV; /**
                                   Author: SpringHack - springhack@live.cn
                                   Last modified: 2017-03-13 14:35:54
                                   Filename: src/server/main.js
                                   Description: Created by SpringHack using vim automatically.
                           **/

var MainWindow = null;

var createWindow = function createWindow() {
    MainWindow = new _electron.BrowserWindow({
        width: 400,
        height: 400,
        center: true,
        webPreferences: {
            //            devTools : false,
            webSecurity: false,
            allowRunningInsecureContent: true
        }
    });
    DEV ? MainWindow.loadURL('http://localhost:9090') : MainWindow.loadURL('file://' + __dirname + '/../dist/index.html');
    MainWindow.on('closed', function () {
        MainWindow = null;
    });
    _electron.ipcMain.on('chat', function () {
        MainWindow.setSize(800, 500);
        MainWindow.center();
    });
    var menu = _electron.Menu.buildFromTemplate([{ label: 'Cut', accelerator: 'CmdOrCtrl+X', click: function click() {
            MainWindow.webContents.cut();
        }
    }, { label: 'Copy', accelerator: 'CmdOrCtrl+C', click: function click() {
            MainWindow.webContents.copy();
        }
    }, { label: 'Paste', accelerator: 'CmdOrCtrl+V', click: function click() {
            MainWindow.webContents.paste();
        }
    }, { label: 'Select All', accelerator: 'CmdOrCtrl+A', click: function click() {
            MainWindow.webContents.selectAll();
        }
    }]);
    MainWindow.webContents.on('context-menu', function (event, params) {
        menu.popup(MainWindow); //MainWindow, {x : params.x, y : params.y});
    });
};

_electron.app.on('ready', createWindow);
_electron.app.on('activate', function () {
    MainWindow || createWindow();
});