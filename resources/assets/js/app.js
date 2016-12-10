window.$ = window.jQuery = require('jquery')
import "es6-promise"

// ==== modules important ========
import Vue from 'vue'
// import Router from 'vue-router'
// import { sync } from 'vuex-router-sync'
import store from './vuex/store'
// import routes from './routes'

//===== components ======
import Menu from '_app/common/components/Menu.vue'
import Breadcrumb from './plugins/breadcrumb'
//===== modules ========
import Dashboard from './components/pages/Dashboard.vue'
import Login from './components/pages/Login.vue'
import Singup from './components/pages/Singup.vue'

new Vue({
    el: 'body', 
    store: store,
    components: {
        Dashboard,
        Login,
        Singup,
    }
})
