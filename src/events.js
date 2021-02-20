import { ipcMain } from 'electron'
import { saveConfig } from './filesystem'

export const registerEvents = () => {
    ipcMain.handle('save-config', (event, config) => {
        return saveConfig(config)
    })
}

export default registerEvents