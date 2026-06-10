const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  notifyOrder: (payload) => ipcRenderer.invoke('notify-order', payload),
  isElectron: true,
});
