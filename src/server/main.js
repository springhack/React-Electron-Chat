/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-11 19:57:21
        Filename: src/server/main.js
        Description: Created by SpringHack using vim automatically.
**/
import {app, ipcMain, globalShortcut, BrowserWindow} from 'electron';

const DEV = process.env.DEV;
let MainWindow = null;

let createWindow = () => {
    MainWindow = new BrowserWindow({
        width : 700,
        height : 430,
        center : true,
        titleBarStyle : 'hidden-inset',
        webPreferences : {
            devTools : false,
            webSecurity: false,
            allowRunningInsecureContent : true
        }
    });
    DEV?MainWindow.loadURL(`http://localhost:9090`):MainWindow.loadURL(`file://${__dirname}/../dist/index.html`);
    MainWindow.on('closed', () => {MainWindow = null});
};

app.on('ready', createWindow);
app.on('activate', () => {MainWindow || createWindow()});
