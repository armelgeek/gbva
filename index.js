require('./server');
const { app,screen, BrowserWindow } = require('electron');
const path = require('path');
//const { autoUpdater } = require("electron-updater")
//autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml');
//console.log(path.join(__dirname, 'dev-app-update.yml'))
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}
let win
const dispatch = (data) => {
  win.webContents.send('message', data)
}
const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({ width, height });
  win.loadURL("http://localhost:1200");
  win.focus();
  win.on('closed', () => {
    win = null
  })
  return win
}
Object.defineProperty(app, 'isPackaged', {
  get() {
    return true;
  }
});
app.on('ready', () => {
  createWindow()
  //autoUpdater.checkForUpdatesAndNotify()
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('version', app.getVersion())
  })
})
app.on('window-all-closed', () => {
  app.quit()
})
/**autoUpdater.on('checking-for-update', () => {
  dispatch('Checking for update...')
})

autoUpdater.on('update-available', (info) => {
  dispatch('Update available.')
})
autoUpdater.on('update-not-available', (info) => {
  dispatch('Update not available.')
})
autoUpdater.on('error', (err) => {
  dispatch('Error in auto-updater. ' + err)
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
  dispatch(log_message)

  win.webContents.send('size', log_message)
  win.webContents.send('download-progress', progressObj.percent)

})
autoUpdater.on('update-downloaded', (info) => {
  dispatch('Update downloaded')
})**/
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
