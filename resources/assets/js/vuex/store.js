import Vue from 'vue'
import Vuex from 'vuex'

// vuex modules
import Loader from './modules/loader.js'
import Modal from './modules/modal.js'
import Session from './modules/session.js'
import Course from './modules/course.js'
import Class from './modules/class.js'
import Team from './modules/team.js'
import Users from './modules/users.js'
import Courses from './modules/courses.js'
import Test from './modules/test.js'

// getting a initial state
let data = window.__INITIAL_STATE__ || {}

// gettin session by localStorage
// let authKey = [], session = {}
// for (var key in localStorage){
//   authKey.push(key)
// }

// if(authKey[0]) {
//     session = JSON.parse(localStorage[authKey[0]])
// }
let session = null
if(JSON.parse(localStorage.getItem('firebase'))) {
    session = JSON.parse(localStorage.getItem('firebase'))
}

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
    Loader,
    Modal,
    Session: Session(session),
    Course: Course(data),
    Class: Class(data),
    Team: Team(data),
    Users: Users(data),
    Courses: Courses(data),
    Test: Test(data)
    }
})

export default store