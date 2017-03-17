window.$ = window.jQuery = require('jquery')
import "es6-promise"

// ==== modules important ========
import Vue from 'vue'
import store from './vuex/store'

//===== components ======
import Menu from '_common/components/Menu.vue' 
import Modal from '_common/components/modal/Base.vue'

//===== Pages ========
import Dashboard from './components/pages/Dashboard.vue'
import Login from './components/pages/Login.vue'
import Singup from './components/pages/Singup.vue'

new Vue({
    el: '#app',
    store,
    components: {
        Dashboard,
        Login,
        Singup,
        Modal
    }
})
