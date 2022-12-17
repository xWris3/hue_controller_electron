export const state = {
    systemUsername: 'defaultSystemUsername',
    systemHostname: 'defaultSystemHostname',
    knownHubs: [],
    preferences: {},
    continuity: {},
};

// Add any other general app state here, with default value

export const mutations = {
    systemInfo(state, payload) {
        state.systemUsername = payload.systemUsername
        state.systemHostname = payload.systemHostname
    },
    knownHubs(state, payload) {
        state.knownHubs = payload
        // TODO: change the local config store if the vuex store changes.
        // >> in reality, it would be better to catch the electron event "before-quit", come back up to Vuex, and save the Vuex state in json file.
    },
    preferences(state, payload) {
        state.preferences = payload // mutation to save the preferences, settings ...
    },
    continuity(state, payload) {
        state.continuity = payload // mutation to save the app state (which page was active and such) - "continuity" sounds cool
    }
    // Add any mutation here (read the doc)
}

export const getters = {
    apiAppId: state => {
        return 'electron_hue_app#' + state.systemUsername + '@' + state.systemHostname
    }
}

export default { state, mutations, getters }

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
    const knownHubs = window.system.config.readConfig('knownHubs')
    knownHubs.then((kH) => {
        if (kH != undefined) {
            store.commit('knownHubs', kH)
        }
    })
    // TODO add reading of the other pieces of settings / continuity to complete the Vuex store
}

export const saveToConfigStore = () => {
    // TODO - save every bit of config to disk - knownHubs, preferences, continuity ...
}