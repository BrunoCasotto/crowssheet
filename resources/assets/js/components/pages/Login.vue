<template lang="html">
	<div>
		<div>
			<v-header></v-header>
		</div>
		<div class="login">
			<form class="login__form" v-on:submit.prevent>
				<div class="form-group">
					<input 
					name="email" 
					v-model="email" 
					type="email"  
					class="form-control" 
					placeholder="Email" 
					v-on:keyup.enter="login"
					>
				</div>
				<div class="form-group">
					<input 
					name="password" 
					v-model="password" 
					type="password" 
					class="form-control" 
					placeholder="Password" 
					v-on:keyup.enter="login"
					>
				</div>
				<button v-on:click="login" class="btn btn-default">Login</button>
				<a href="/auth/register" class="btn btn-default" >Singup</a>
			</form>

			<div class="login__background">
				<logo-corvo apperance="background__login" ></logo-corvo>
			</div>
			<div class="login__footer">
				<v-footer></v-footer>
			</div>
		</div>
		<loader></loader>
	</div>
</template>

<script>
	import LogoCorvo from "_common/components/Logo.vue"
	import VHeader from "_components/includes/Header.vue"
	import VFooter from "_components/includes/Footer.vue"
	import authService from '_service/auth'
	import growl from "growl-alert"
	import Loader from '_common/components/Loader.vue'

	export default {
		name: 'Login',
		data () {
			return {
				email: '',
				password: ''
			}
		},
		mounted() {
			this.verifyLogin()
		},
		components: {
			LogoCorvo,
			VHeader,
			VFooter,
			Loader
		},
		methods: {
			verifyLogin() {
				let authKey = null
				for (var key in localStorage){
					authKey = key
				}
				
				if(authKey) {
					if(JSON.parse(localStorage[authKey]).apiKey) {
						window.location.assign('/dashboard')
					}
				}
			},
			login () {
				this.$store.dispatch('toggleLoader', true)
				authService
				.login( this.email, this.password )
				.then(response => {
					this.$store.dispatch('toggleLoader', false)
					if (response.status == true) {
						this.$store.dispatch('updateSession', response.data)
						window.location.assign('/dashboard')
					}
				})
				.catch(error => {
					this.$store.dispatch('toggleLoader', false)
					console.log(error)
				})
			}
		}
	}
</script>
<style lang="sass" scoped>
	@import "~_config/_vars.scss";

	.login {
		padding: 40px;
		display: flex;
		height: 100%;
		justify-content: center;
		align-items: center;
		@media screen and(max-width: $screen-xs) {
			display: block;
			padding: 0 10px;
		}

		&__strip {
			display: flex;
		}

		&__form {
			width: 400px;
			height: 180px;
			padding: 10px;
			border-radius: 8px;
			transform: translateY(-25%);
			z-index:1;
			background-color: $color-grey--dark;

			@media screen and(max-width: $screen-md) {
				margin-top: 80px;
			}

			@media screen and(max-width: $screen-sm) {
				width: 100%;
				transform: translate(0);
				margin-top: 50px auto 0 auto;
			}
		}

		&__background {
			padding-left: 10%;
			z-index: 2;
			transform: translateY(-15%);

			@media screen and(max-width: $screen-md) {
				display: none;
			}
		}

		.login__footer {
			position: absolute;
			bottom: 0;
			width: 100%;
		}
	}
</style>
