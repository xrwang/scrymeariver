const { app, BrowserWindow, powerMonitor, screen } = require('electron')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

function createWindow () {

  let size = screen.getPrimaryDisplay().size;
  let width = size.width;
  let height = size.height;

  // Create the browser window.
  win = new BrowserWindow({
    'width': width,
    'height': height,
    'max-width': width,
    'max-height': height,
    'frame': false,
    'titleBarStyle': 'hidden',
    'autoHideMenuBar': true,
    'resizable':false,
    'kiosk': true,
    'show':true,
    'simpleFullscreen':true,
    'fullscreen':true
  })


  // and load the index.html of the app.
  win.loadFile('index.html')

  // devtools
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

function fullScreen () {
  win.maximize();
  win.closable = false;
  //make window uncloseable
  win.setFullScreen(true);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  fullScreen();
  powerMonitor.on('on-battery', () => {
    console.log('the system is on battery mode')
  })
})

// app.dock.hide();

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // This part not used since user can't close the window
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
