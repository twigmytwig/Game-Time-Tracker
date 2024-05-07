const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('app', {
  window:{
    close: () => ipcRenderer.send("app/close"),
    minimize: () => ipcRenderer.send("app/minimize"),
    maximize: () => ipcRenderer.send("app/maximize")
  },
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  getActiveGame: () => ipcRenderer.invoke('getActiveGame'),
  updateJSONDisplay: () => ipcRenderer.invoke('updateJSONDisplay'),
  // we can also expose variables, not just functions
})