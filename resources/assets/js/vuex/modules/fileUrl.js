
export default {
    state: {
        url: false
    },
    mutations: {
        setFileUrl (state, data) {
            state.url = data
        }
    },
    actions: {
        setFileUrl(context, data) {
            context.commit('setFileUrl', data)
        }
    }
}
