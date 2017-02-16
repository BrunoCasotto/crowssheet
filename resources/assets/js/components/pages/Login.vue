<template lang="html">
	<div>
		<div>
			<v-header></v-header>
		</div>
		<div class="login">
			<div class="login__strip">
				<form class="login__form" v-on:submit.prevent>
					<div class="form-group">
						<input name="email" v-model="email" type="email"  class="form-control" placeholder="Email">
					</div>
					<div class="form-group">
						<input name="password" v-model="password" type="password" class="form-control" placeholder="Password">
					</div>
					<button v-on:click="login" class="btn btn-default">Login</button>
					<a href="/auth/register" class="btn btn-default" >Singup</a>
				</form>

				<div class="login__background">
					<logo-corvo apperance="background__login" ></logo-corvo>
				</div>

			</div>
			<div class="login__footer">
				<v-footer></v-footer>
			</div>
		</div>
	</div>
</template>

<script>
	import LogoCorvo from "_common/components/Logo.vue"
	import VHeader from "_components/includes/Header.vue"
	import VFooter from "_components/includes/Footer.vue"
	import axios from 'axios'

	export default {
		name: 'Login',
		data () {
			return {
				email: '',
				password: ''
			}
		},
		components: {
			LogoCorvo,
			VHeader,
			VFooter
		},
		methods: {
			login () {
				axios.post('/auth/singin', {
					email: this.email,
					password: this.password
				})
				.then(response => {
					if (response.data.status == true) {
						window.location.assign('/dashboard')
					} else {
						console.log(response)
					}
				})
				.catch(error => {
					
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

		&__strip {
			display: flex;
		}

		/*&:after {
			content: '';
			display: block;
			width: 100%;
			height: 30%;
			background-color: $color-grey--base;
			position: absolute;
			top:100px;
		}*/

		&__form {
			width: 400px;
			height: 180px;
			padding: 10px;
			border-radius: 8px;
			transform: translateY(-25%);
			z-index:1;
			background-color: $color-grey--dark;
		}

		&__background {
			padding-left: 10%;
			z-index: 2;
			transform: translateY(-15%);
		}
	}
</style>
