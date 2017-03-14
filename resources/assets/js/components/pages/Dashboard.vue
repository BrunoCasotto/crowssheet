<template lang="html">
   	<div class="dashboard">
		<div class="dashboard__header">
			<div class="header__logo">
				<logo width="100px" height="100px"></logo>
			</div>
			<div class="header__user">
			<p class="handshake">Olá, {{user.displayName}} </p>
			</div>
		</div>
		<div class="dashboard__content">
			<div class="menu">
				<side-menu></side-menu>
			</div>
			<div class="content">
				<home v-if="active == 'home'"></home>
				<course-form v-show="active == 'create'"></course-form>
				<course-list v-show="active == 'courses'"></course-list>
			</div>
		</div>
		<loader></loader>
	</div>
</template>
<script>
	import SideMenu from "_common/components/Menu.vue"
	import TextBlock from "_common/components/Text-block.vue"
	import Logo from "_common/components/Logo.vue"
	import Home from "_components/includes/dashboard/Home.vue"
	import CourseList from "_components/includes/dashboard/Course-list.vue"
	import CourseForm from "_components/includes/dashboard/Course-form.vue"
	import authService from '_service/auth'
	import Loader from '_common/components/Loader.vue'

    export default {
        name: 'Dashboard',
        components: {
			SideMenu,
			Logo,
			TextBlock,
			Home,
			CourseForm,
			CourseList,
			Loader
        },
		mounted() {
			this.setUser()
			this.verifyLogin()
		},
		methods: {
			verifyLogin() {
				let authKey = null
				for (var key in localStorage){
					authKey = key
				}
				
				if(!authKey) {
					window.location.assign('/')
				} else if(!JSON.parse(localStorage[authKey]).apiKey) {
					window.location.assign('/')
				}

			},
			setUser() {
				let authKey = null
				for (var key in localStorage){
					authKey = key
				}
				if(authKey) {
					this.$store.dispatch('setSession', JSON.parse(localStorage[authKey]))
				}
			}
			
		},
		computed: {
			active: function () {
				return this.$store.state.Menu.active
			},
			user: function() {
				return this.$store.state.App.session
			}
		}
    }
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	
	.dashboard {
		height: 100%;

		&__header {
			border-bottom: solid 1px $color-grey--light;
			height: 100px;
			display: flex;
			justify-content: space-between;

			.header__logo {
				position: relative;
				left: 5px;
				top: 5px;
				height: 100%;
			}

			.header__user {
				.logout {
					cursor: pointer;
				}
			}
		}

		.dashboard__content {
			display: flex;
			height: 100%;
			@media screen and(max-width: $screen-md) {
				padding: 0;
			}
			.content {
				flex: 4;
				border-right: solid 0.5px $color-grey--light;
				@media screen and(max-width: $screen-md) {
					border-right: none;
				}

				
			}
		}

	}
</style>
