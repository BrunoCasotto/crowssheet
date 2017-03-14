import Vue from 'vue'
import Vuex from 'vuex'

import Menu from './modules/menu.js'
import Loader from './modules/loader.js'
import App from './modules/app.js'
let data = window.__INITIAL_STATE__ || {}

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
		Menu,
    Loader,
    App
    }
})

export default store