
export default {
    state: {
        active: false,
		data: {},
        type: ''
    },
    mutations: {
        toggleModal (state, data) {
            state.active = data.active
            state.data = data.data
            state.type = data.type
        }
    },
    actions: {
        toggleModal(context, data) {
			context.commit('toggleModal', data)
        }
    }
}
