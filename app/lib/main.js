'use strict';

var _electron = require('electron');

var DEV = process.env.DEV; /**
                                   Author: SpringHack - springhack@live.cn
                                   Last modified: 2017-03-12 21:57:15
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
            devTools: false,
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
};

_electron.app.on('ready', createWindow);
_electron.app.on('activate', function () {
    MainWindow || createWindow();
});