
export default {
    state: {
        active: false
    },
    mutations: {
        toggleLoader ( state, active ) {
			state.active = active
        }
    },
    actions: {
        toggleLoader( context, active ) {
			context.commit('toggleLoader', active)
        }
    }
}
