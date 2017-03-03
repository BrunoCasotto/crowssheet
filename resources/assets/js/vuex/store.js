import Vue from 'vue'
import Vuex from 'vuex'

import Menu from './modules/menu.js'
import Loader from './modules/loader.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
		Menu,
    Loader
    }
})

export default store