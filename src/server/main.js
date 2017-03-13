/**
        Author: SpringHack - springhack@live.cn
        Last modified: 2017-03-13 18:19:33
        Filename: src/server/main.js
        Description: Created by SpringHack using vim automatically.
**/
import {app, Menu, ipcMain, webContents, BrowserWindow} from 'electron';

const DEV = process.env.DEV;
let MainWindow = null;

let createWindow = () => {
    MainWindow = new BrowserWindow({
        width : 400,
        minWidth : 400,
        height : 400,
        minHeight : 400,
        center : true,
        webPreferences : {
            //devTools : false,
            webSecurity: false,
            allowRunningInsecureContent : true,
            textAreasAreResizable : false
        }
    });
    DEV?MainWindow.loadURL(`http://localhost:9090`):MainWindow.loadURL(`file://${__dirname}/../dist/index.html`);
    MainWindow.on('closed', () => {
        MainWindow = null;
        app.exit();
    });
    ipcMain.on('chat', () => {
        MainWindow.setSize(800, 500);
        MainWindow.setMinimumSize(800, 500);
        MainWindow.center();
    });
    let menu = Menu.buildFromTemplate([
        {label : 'Cut', accelerator : 'CmdOrCtrl+X', click() { MainWindow.webContents.cut(); }},
        {label : 'Copy', accelerator : 'CmdOrCtrl+C', click() { MainWindow.webContents.copy(); }},
        {label : 'Paste', accelerator : 'CmdOrCtrl+V', click() { MainWindow.webContents.paste(); }},
        {label : 'Select All', accelerator : 'CmdOrCtrl+A', click() { MainWindow.webContents.selectAll(); }}
    ]);
    MainWindow.webContents.on('context-menu', (event, params) => {
        menu.popup(MainWindow);
    });
};

app.on('ready', createWindow);
app.on('activate', () => {MainWindow || createWindow()});
