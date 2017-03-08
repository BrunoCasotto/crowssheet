import Vue from 'vue'
import Vuex from 'vuex'

import Menu from './modules/menu.js'
import Loader from './modules/loader.js'
import Session from './modules/session.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
		Menu,
    Loader,
    Session
    }
})

export default store