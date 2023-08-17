const { app, BrowserWindow, ipcMain, globalShortcut , Menu } = require("electron");
const path = require("path");


let mianManu = Menu.buildFromTemplate(require('../mainMenu'));

class MainScreen {
  window;

  position = {
    width: 1400,
    height: 750,
    maximized: false,
};

  constructor() {
    this.window = new BrowserWindow({
      width: this.position.width,
      height: this.position.height,
      title: "This is a test application",
      show: false,
      removeMenu: true,
      acceptFirstMouse: true,
      autoHideMenuBar: true,
      webPreferences: {
        contextIsolation: true,
        // preload: path.join(__dirname, "./src/source/ManinPreload.js"),
      },
    });

    this.window.once("ready-to-show", () => {
      this.window.show();

      if (this.position.maximized) {
        this.window.maximize();
      }
    });

    this.handleMessages();

    let wc = this.window.webContents;
    wc.openDevTools({ mode: "undocked" });

    this.window.loadFile("./src/page/Login.html");

    Menu.setApplicationMenu(mianManu);

  }

  close() {
    this.window.close();
    ipcMain.removeAllListeners();
  }

  hide() {
    this.window.hide();
  }

  handleMessages() {
    //Ipc functions go here.
  }
}

module.exports = MainScreen;