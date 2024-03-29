import { ipcMain, dialog } from 'electron'
import { saveConfig, readConfig } from './config'

export const registerEvents = () => {
    /**
     * Configuration events
     */
    ipcMain.handle('save-config', (event, key, value) => {
        return saveConfig(key, value);
    });
    ipcMain.handle('read-config', (event, key) => {
        return readConfig(key);
    });

    /**
     * Windows events
     */

     /**
      * Electron dialogs
      * For a list of available option read :
      * https://www.electronjs.org/docs/api/dialog
      */
    ipcMain.handle('messagebox', (event, options) => {
        return dialog.showMessageBox(options)
    })

    ipcMain.handle('errorbox', (event, options) => {
        return dialog.showErrorBox(options)
    })

    /**
     * System value events
     */
    ipcMain.handle('get-system-username', (event) => {
        return require('os').userInfo().username;
    });
}

export default registerEvents