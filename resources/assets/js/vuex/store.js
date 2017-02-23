import Vue from 'vue'
import Vuex from 'vuex'

import Menu from './modules/menu.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
		Menu
    }
})

export default store