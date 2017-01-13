import Vue from 'vue'
import Vuex from 'vuex'
let data = window.DigitalDrift || {};
// import project from './modules/project.js'
// import post from './modules/post'
import loader from './modules/loader'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        loader: loader(data.loader)
    }
})
