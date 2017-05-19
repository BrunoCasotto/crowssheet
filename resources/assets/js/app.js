window.$ = window.jQuery = require('jquery')
import "es6-promise"

// ==== modules important ========
import Vue from 'vue'
import store from './vuex/store'
import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)

//===== components ======
import Menu from '_common/components/Menu.vue' 
import Logo from '_common/components/Logo.vue' 
import Modal from '_common/components/modal/Base.vue'
import MenuMobile from '_common/components/MenuMobile.vue'
import Account from '_common/components/Account.vue'
import Loader from '_common/components/Loader.vue'

//===== Pages ========
import Dashboard from '_components/pages/Dashboard.vue'
import Login from '_components/pages/Login.vue'
import Singup from '_components/pages/Singup.vue'
import CourseForm from '_components/pages/CourseForm.vue'
import CourseUpdate from '_components/pages/CourseUpdate.vue'
import CourseList from '_components/pages/CourseList.vue'
import Team from '_components/pages/Team.vue'
import TeamUpdate from '_components/pages/TeamUpdate.vue'
import UserList from '_components/pages/UserList.vue'
import ClassRoom from '_components/pages/ClassRoom.vue'
import ClassUpdate from '_components/pages/ClassUpdate.vue'
import CourseRoom from '_components/pages/CourseRoom.vue'
import CourseClassRoom from '_components/pages/CourseClassRoom.vue'
import TestRoom from '_components/pages/TestRoom.vue'
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
        Team,
        ClassRoom,
        CourseRoom,
        CourseClassRoom,
        TestRoom,
        CourseUpdate,
        ClassUpdate,
        TeamUpdate,
        MenuMobile
    },
    computed: {
        user: function () {
            return this.$store.state.Session
        },
        menuActive: function() {
            return this.$store.state.MenuMobile.state
        }
    }
})
