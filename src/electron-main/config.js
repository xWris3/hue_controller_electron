import Store from 'electron-store'

//Settings store & options
const settingsStore = new Store({ name: "hueSettings" });

export const saveConfig = async (key, value) => {
    settingsStore.set(key, value);
}

export const readConfig = async (key) => {
    return settingsStore.get(key);
}