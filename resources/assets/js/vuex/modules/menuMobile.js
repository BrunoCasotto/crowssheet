
export default {
    state: {
		state: false
	},
    mutations: {
        toggleMenuMobile (state, active) {
            state.state = !state.state
        }
    },
    actions: {
        toggleMenuMobile(context, active) {
			context.commit('toggleMenuMobile', active)
        }
    }
}
