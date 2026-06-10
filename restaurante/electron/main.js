const { app, BrowserWindow, Notification, ipcMain, powerSaveBlocker, Menu } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
let mainWindow = null;
let powerSaveId = null;

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (app.isPackaged) {
    Menu.setApplicationMenu(null);
  }

  if (isDev) {
    mainWindow.loadURL('http://localhost:5174/restaurante/');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  powerSaveId = powerSaveBlocker.start('prevent-display-sleep');
  console.log('[electron] powerSaveBlocker started, id=', powerSaveId, 'active=', powerSaveBlocker.isStarted(powerSaveId));

  mainWindow.on('closed', () => {
    if (powerSaveId !== null && powerSaveBlocker.isStarted(powerSaveId)) {
      powerSaveBlocker.stop(powerSaveId);
    }
    mainWindow = null;
  });
}

ipcMain.handle('notify-order', (_event, { title, body }) => {
  if (Notification.isSupported()) {
    const n = new Notification({
      title: title || 'Nuevo pedido',
      body: body || 'Tienes un nuevo pedido en DEWAN',
      urgency: 'critical',
    });
    n.show();
    n.on('click', () => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
      }
    });
    return true;
  }
  return false;
});

app.whenReady().then(() => {
  createWindow();

  if (app.isPackaged) {
    app.setLoginItemSettings({ openAtLogin: true });
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
