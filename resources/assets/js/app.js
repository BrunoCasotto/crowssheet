window.$ = window.jQuery = require('jquery')
import "es6-promise"

// ==== modules important ========
import Vue from 'vue'
import store from './vuex/store'

//===== components ======
import Menu from '_common/components/Menu.vue' 
import Logo from '_common/components/Logo.vue' 
import Modal from '_common/components/modal/Base.vue'
import Account from '_common/components/Account.vue'
import Loader from '_common/components/Loader.vue'

//===== Pages ========
import Dashboard from '_components/pages/Dashboard.vue'
import Login from '_components/pages/Login.vue'
import Singup from '_components/pages/Singup.vue'
import CourseForm from '_components/pages/CourseForm.vue'
import CourseList from '_components/pages/CourseList.vue'
import TeamList from '_components/pages/TeamList.vue'
import UserList from '_components/pages/UserList.vue'
import ClassModal from '_common/components/modal/ClassModal.vue'

new Vue({
    el: '#app',
    store,
    components: {
        Dashboard,
        Login,
        Singup,
        Modal,
        Account,
        Loader,
        CourseForm,
        Logo,
        CourseList,
        ClassModal,
        UserList,
        TeamList
    }
})
