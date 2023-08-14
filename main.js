// Modules
const electron = require('electron');
const { app, screen , BrowserWindow, dialog, globalShortcut, Menu, MenuItem, Tray  } = electron
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, tray

let mianManu = Menu.buildFromTemplate(require('./src/mainMenu.js'));
let contextMenu = Menu.buildFromTemplate([
  { label: 'item1' },
  {
    role: 'editMenu',
  }
])
let trayMemu = Menu.buildFromTemplate([
  {label:'TestItem1'},
  {role:'quit'}
])
function createTray() {
  tray = new Tray('trayTamplate@2x.png')
  tray.setToolTip('tray Detail')
  tray.on('click', e => {
    if (e.shiftKey) {
      app.quit()
    } else {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    }
  })

  tray.setContextMenu(trayMemu)
} 
// Create a new BrowserWindow when `app` is ready
function createWindow() {
  
  createTray()
  let display = (screen.getAllDisplays())
 
  let primeryDisplay = screen.getPrimaryDisplay() 
  // console.log(`${display[0].size.width} x ${display[0].size.height}`)
  // console.log(`${display[0].bounds.x}, ${display[0].bounds.y}`)
  // // console.log(`${display[1].size.width} x ${display[1].size.height}`)
  // // console.log(`${display[1].bounds.x}, ${display[1].bounds.y}`)
 
  // screen.on('display-metrics-changed',(e,disply,metricsCharnge)=>{
  //   console.log(metricsCharnge)
  // })
  // setInterval(()=>{
  //   console.log(screen.getCursorScreenPoint())
  // },100)

  mainWindow = new BrowserWindow({
    x : primeryDisplay.bounds.x, y : primeryDisplay.bounds.y,
    width: primeryDisplay.size.width/2, height: primeryDisplay.size.height/2,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contex tIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })
  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('./src/index.html')
  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('context-menu', () => {
    contextMenu.popup()
  })

  Menu.setApplicationMenu(mianManu)

  // globalShortcut.regiaster('CommandORControl+G' ,()=>{
  //   console.log('user press key G ')
  //   globalShortcut.unregister('CommandORControl+G')
  // })


  // mainWindow.webContents.on('did-finish-load',()=>{
  //   // dialog.showOpenDialog(mainWindow , {
  //   //   buttonLablel: 'Select a photo',
  //   //   // properties : ['multiSelections', 'createDirectory ', 'openFile','openDirectory']
  //   //   defaultPath:  app.getPath('home')
  //   // }).then(result => {
  //   //   console.log(result)
  //   // })

  //   // dialog.showSaveDialog({}).than(result=>{
  //   //   console.log(result)
  //   // })
  //   // const answers = ['Yes','No','Waitng a Program']

  //   // dialog.showMessageBox({
  //   //   title : 'Message Box',
  //   //   message:'please Select an option ',
  //   //   buttons: answers
  //   // }).then( result =>  {
  //   //     console.log(`You selected ${answers[result.response]}`)
  //   //   })

  // })


  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  electron.powerMonitor.on('resume',e=>{
    if(!mainWindow) createWindow()
  })
  electron.powerMonitor.on('suspend',e=>{
    console.log('Saving some Data')
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
  