import Vue from 'vue'
import Vuex from 'vuex'

// vuex modules
import Loader from './modules/loader.js'
import Modal from './modules/modal.js'
import Session from './modules/session.js'
import Course from './modules/course.js'
import Class from './modules/class.js'

// getting a initial state
let data = window.__INITIAL_STATE__ || {}

// gettin session by localStorage
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
    Loader,
    Modal,
    Session: Session(session),
    Course: Course(data),
    Class: Class(data)
    }
})

export default store