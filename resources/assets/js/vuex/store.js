import Vue from 'vue'
import Vuex from 'vuex'

import Menu from './modules/menu.js'
import Loader from './modules/loader.js'
import Session from './modules/session.js'
let data = window.__INITIAL_STATE__ || {}

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
		Menu,
    Loader,
    Session: Session(data.user)
    }
})

export default store