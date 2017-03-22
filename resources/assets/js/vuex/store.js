import Vue from 'vue'
import Vuex from 'vuex'

import Menu from './modules/menu.js'
import Loader from './modules/loader.js'
import App from './modules/app.js'
import Modal from './modules/modal.js'
import Session from './modules/session.js'
let data = window.__INITIAL_STATE__ || {}

//gettin session by localStorage
let authKey = [], session = {}
for (var key in localStorage){
  authKey.push(key)
}

if(authKey[0]) {
    session = JSON.parse(localStorage[authKey[0]])
}

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
		Menu,
    Loader,
    App,
    Modal,
    Session: Session(session)
    }
})

export default store