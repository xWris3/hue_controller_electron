import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('ipc', ipcRenderer)

contextBridge.exposeInMainWorld('system', {
    getUserInfo() {
        return ipcRenderer.invoke('get-system-username')
    },
    sendSystemMessageBox(options) {
        return ipcRenderer.invoke('messagebox', options)
    }
})