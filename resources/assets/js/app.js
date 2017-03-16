window.$ = window.jQuery = require('jquery')
import "es6-promise"

// ==== modules important ========
import Vue from 'vue'
// import Router from 'vue-router'
// import { sync } from 'vuex-router-sync'
import store from './vuex/store'
// import routes from './routes'

//===== components ======
import Menu from '_common/components/Menu.vue' 
import PhotoGrid from '_common/components/PhotoGrid.vue'
import Breadcrumb from './plugins/breadcrumb'
import Post from '_components/Post.vue'
import SinglePost from '_components/SinglePost.vue'
import Modal from '_common/components/modal/Base.vue'

//===== Pages ========
import Dashboard from './components/pages/Dashboard.vue'
import Login from './components/pages/Login.vue'
import Singup from './components/pages/Singup.vue'
import Programming from './components/pages/Programming.vue'

new Vue({
    el: '#app', 
    store,
    components: {
        Dashboard,
        Login,
        Singup,
        Post,
        PhotoGrid,
        SinglePost,
        Programming,
        Modal
    }
})
