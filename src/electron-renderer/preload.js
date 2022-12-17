import { contextBridge, ipcRenderer } from 'electron'
// see: https://github.com/megahertz/electron-log/blob/HEAD/docs/node-integration.md
const log = require('electron-log')

/**
 * We create methods that will invoke registered events on the main (background.js) process.
 * We ensure the ipcRenderer is not exposed through devTools.
 */

contextBridge.exposeInMainWorld('system', {
    // Computer related information
    getSystemUsername() {
        return ipcRenderer.invoke('get-system-username')
    },
    getSystemHostname() {
        return ipcRenderer.invoke('get-system-hostname')
    },
    // Send system boxes
    sendSystemMessageBox(options) {
        return ipcRenderer.invoke('messagebox', options)
    },
    sendSystemErrorBox(options) {
        return ipcRenderer.invoke('errorbox', options)
    },
    // Config related, saves data in the json config-store
    config: {
        readConfig(key) {
            return ipcRenderer.invoke('read-config', key)
        },
        writeConfig(key, value) {
            return ipcRenderer.invoke('save-config', key, value)
        }
    },
    // MDns related, invoke event on the main thread, to make Multicast-Dns requests
    mdns: {
        mdnsLookup() {
            return ipcRenderer.invoke('mdns-lookup')
        }
    },
    log: log.functions
})