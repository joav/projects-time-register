const { remote } = require('electron');
window.ptrMainProc = remote.require('./main.js');
