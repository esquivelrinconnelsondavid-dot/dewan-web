const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  notifyOrder: (payload) => ipcRenderer.invoke('notify-order', payload),
  listarImpresoras: () => ipcRenderer.invoke('listar-impresoras'),
  imprimirComanda: (payload) => ipcRenderer.invoke('imprimir-comanda', payload),
  recuperarRed: () => ipcRenderer.invoke('recuperar-red'),
  latido: () => ipcRenderer.send('latido'),            // watchdog del proceso principal
  reiniciarApp: () => ipcRenderer.send('reiniciar-app'), // relanzar (proceso nuevo)
  isElectron: true,
});
