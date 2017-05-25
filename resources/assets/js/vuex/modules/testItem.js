
export default {
    state: {
        item: false
    },
    mutations: {
        setTestItem (state, data) {
            state.item = data
        }
    },
    actions: {
        setTestItem(context, data) {
            context.commit('setTestItem', data)
        }
    }
}
