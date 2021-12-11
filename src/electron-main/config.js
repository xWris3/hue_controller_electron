import * as fs from 'fs'
import Store from 'electron-store'

//Settings store & options
const settingsStore = new Store({ name: "hueSettings" });

export const saveConfig = async (key, value) => {
    settingsStore.set(key, value);
    

    // try {
    //     await fs.writeFile('./mdr.txt', Buffer.from('mdr'))
    //     await fs.writeFile('./mdr.txt', Buffer.from('mdr'))
    //     await fs.writeFile('./mdr.txt', Buffer.from('mdr'))
    //     await fs.writeFile('./mdr.txt', Buffer.from('mdr'))
    //     await fs.writeFile('./mdr.txt', Buffer.from('mdr'))
    // } catch (error) {

    // }
}

export const readConfig = async (key) => {
    return settingsStore.get(key);
}