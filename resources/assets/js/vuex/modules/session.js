import AuthService from '_service/auth'


export default function( data ){
    const state = data || {}

    const mutations = {
        updateSession (state, data) {
            state.active = data
        }
    }

    const actions = {
        updateSession(context, data) {
			context.commit('updateSession', data)
        }
    }

    return {
        state,
        mutations,
        actions
    }
}
