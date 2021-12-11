export const state = {
    systemUsername: 'defaultSystemUsername',
    systemHostname: 'defaultSystemHostname'
}

export const mutations = {
    systemUserInfo(state, payload) {
        state.systemUsername = payload.systemUsername
        state.systemHostname = payload.systemHostname
    }
    // Add any mutation here (read the doc)
}

export default { state, mutations }