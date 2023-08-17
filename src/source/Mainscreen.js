const { app, BrowserWindow, ipcMain, globalShortcut ,Menu , MenuItem} = require("electron");
const path = require("path");


// let mainManu = Menu.buildFromTemplate(require('./mainMenu.js')) 

 let mainMenu = Menu.buildFromTemplate([
  {
  label: 'Electron',
  submenu: [
    { label: 'item1' },
    {
      label: 'item2',
      submenu: [
        {
          label: 'sub1',
        }, {
          label: 'sub2',
        }, {
          label: 'sub3',
        }
      ]
    }
  ]
 },
 {
  label : 'Edit ',
  submenu : [
   {role : 'undo'},
   {role : 'redo'},
   {role : 'copy'},
   {role : 'paste'}
  ] 
 },
 {
  label: 'Action',
  submenu: [
    {
      label: 'Devtools',
      role: 'toggleDevTools'
    },
    {
      role: 'toggleFullScreen'
    },
    {
      label: 'test2',
      click: () => {
        console.log('Hello from Main Menu');
      },
      accelerator: 'Control + Shift + I'
    }
  ]
 }
])
 
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
      // show: false,
      // removeMenu: true,
      // acceptFirstMouse: true,
      // autoHideMenuBar: true,
      webPreferences: {
        // contextIsolation: true,
        nodeIntegration : true,
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

    // let wc = this.window.webContents;
    // wc.openDevTools({ mode: "undocked" });

    this.window.loadFile("./src/page/Login.html");  

    Menu.setApplicationMenu(mainMenu)

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