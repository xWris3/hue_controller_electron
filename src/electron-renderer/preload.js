import { contextBridge, ipcRenderer } from 'electron'


/**
 * We create methods that will invoke registered events on the main (background.js) process.
 * We ensure the ipcRenderer is not exposed through devTools.
 */

contextBridge.exposeInMainWorld('system', {
    getSystemUsername() {
        return ipcRenderer.invoke('get-system-username')
    },
    getSystemHostname() {
        return ipcRenderer.invoke('get-system-hostname')
    },
    sendSystemMessageBox(options) {
        return ipcRenderer.invoke('messagebox', options)
    },
    'config': {
        readConfig(key) {
            return ipcRenderer.invoke('read-config', key)
        },
        writeConfig(key, value) {
            return ipcRenderer.invoke('save-config', key, value)
        }
    }
})