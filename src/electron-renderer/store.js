export const state = {
    systemUsername: 'defaultSystemUsername',
    systemHostname: 'defaultSystemHostname',
    config: {

    },
    // Add any other general app state here, with default value
}

export const mutations = {
    systemInfo(state, payload) {
        state.systemUsername = payload.systemUsername
        state.systemHostname = payload.systemHostname
    },
    configStore(state, payload) {
        state.config.hubs = payload.config
        // TODO: change the local config store if the vuex store changes.
    }
    // Add any mutation here (read the doc)
}

export default { state, mutations }

/*
 * Init local Vuex config store from various sources 
 */
export const initFromCurrentSystemVars = (store) => {
    // Get values using preload functions making use of registered events.
    const sysValuePromises = [window.system.getSystemUsername(), window.system.getSystemHostname()]
    Promise.all(sysValuePromises).then((values) => {
        store.commit('systemInfo', {
            systemUsername: values[0],
            systemHostname: values[1]
        })
    })
}
export const initFromConfigStore = (store) => {
    // Get values from the config store
    const hubs = window.system.config.readConfig('hubs')
    hubs.then((value) => {
        store.commit('configStore', {
            config: value,
        })
    })
}