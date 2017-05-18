
export default {
    state: {
        active: false,
        data: {},
        type: '',
        confirm: false
    },
    mutations: {
        toggleModal (state, data) {
            state.active = data.active
            state.data = data.data
            state.type = data.type
        },
        toggleConfirm (state, data) {
            state.confirm = data
        }
    },
    actions: {
        toggleModal(context, data) {
            context.commit('toggleModal', data)
        },
        toggleConfirm(context, data) {
            context.commit('toggleConfirm', data)
        }
    }
}
