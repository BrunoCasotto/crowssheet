import AuthService from '_service/auth'

export default {
    state : {
        session: {}
    },
    mutations : {
        setSession (state, data) {
            state.session = data
        }
    },
    actions : {
        setSession(context, data) {
			context.commit('setSession', data)
        }
    }
}
