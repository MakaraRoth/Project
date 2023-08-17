// Modules
const electron = require('electron');
const { app, Menu } = electron
const MainScreen = require('./src/source/Mainscreen.js')
const Globle = require('./globle.js')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
  let curWindow;
  function createWindow() {
    curWindow = new MainScreen();
  }
  app.whenReady().then(() => {
    createWindow();
  
    app.on("activate", function () {
      if (BrowserWindow.getAllWindows().length == 0) createWindow();
    });
  });
  
  //Global exception handler
  process.on("uncaughtException", function (err) {
    console.log(err);
  });
  
  app.on("window-all-closed", function () {
    if (process.platform != "darwin") app.quit();
  });
