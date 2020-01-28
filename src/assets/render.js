const { remote, ipcMain } = require('electron');
window.ptrMainProc = remote.require('./main.js');
window.ptrIpc = ipcMain;
