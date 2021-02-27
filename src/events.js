import { ipcMain } from 'electron'
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
     * System value events
     */
    ipcMain.handle('get-system-username', (event) => {
        return require('os').userInfo().username;
    });
}

export default registerEvents