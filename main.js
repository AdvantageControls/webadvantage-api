const { app, BrowserWindow, ipcMain, ClientRequest } = require('electron')
const path = require('path')
const url = require('url')
const exec = require('child_process').exec;
require('electron-reload')(__dirname);
const { autoUpdater } = require("electron-updater");
let mainWindow;

app.on('ready', () => {

  //autoUpdater.checkForUpdates();
  autoUpdater.checkForUpdatesAndNotify();
  
  autoUpdater.on('checking-for-update', () => {
    mainWindow.webContents.send('checking-for-update')
  })

  autoUpdater.on('update-available', (info) => {
    mainWindow.webContents.send('update-available')
  })

  autoUpdater.on('update-not-available', (info) => {
    mainWindow.webContents.send('update-not-available')
  })

  autoUpdater.on('error', (err) => {
    mainWindow.webContents.send('update-error')
  })

  autoUpdater.on('update-downloaded', (info) => {
    mainWindow.webContents.send('update-downloaded')
  })

  mainWindow = new BrowserWindow({ width: 800, height: 1300, title: "WebAdvantage 3 - API"}); // to get rid of title bar: frame: false

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })

  mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
  }));



});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
