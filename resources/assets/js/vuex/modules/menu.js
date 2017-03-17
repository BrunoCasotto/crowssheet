
export default {
    state: {
        active: 'home'
    },
    mutations: {
        updateMenu (state, active) {
            state.active = active
        }
    },
    actions: {
        updateMenu(context, active) {
			context.commit('updateMenu', active)
        }
    }
}
