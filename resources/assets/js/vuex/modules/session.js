import AuthService from '_service/auth'


export default {
    state:'roso',
    mutations: {
        updateSession (state, data) {
            state.active = data
        }
    },
    actions: {
        updateSession(context, data) {
			context.commit('updateSession', data)
        }
    }
}
