<template lang="html">
	<div>
		<v-header></v-header>
	</div>
	<div class="login">
		<div class="login__strip">
			<form class="login__form" action="/login" method="post">
				<div class="form-group">
					<input v-model="email" type="email" class="form-control" placeholder="Email">
				</div>
				<div class="form-group">
					<input v-model="password" type="password" class="form-control" placeholder="Password">
				</div>
				<button type="submit" class="btn btn-default">Login</button>
				<a href="/auth/register" class="btn btn-default" >Singup</a>
			</form>

			<div class="login__logo">
				<img src="/images/Logo.png" alt=""></img>
			</div>
		</div>
		<div class="login__footer">
			<v-footer></v-footer>
		</div>
	</div>
</template>

<script>
	import LogoCorvo from "_app/common/components/Logo.vue"
	import VHeader from "_app/components/includes/Header.vue"
	import VFooter from "_app/components/includes/Footer.vue"

	export default {
		name: 'Login',
		data: function() {
			return {
				email: '',
				password: ''
			}
		},
		components: {
			LogoCorvo,
			VHeader,
			VFooter
		}
	}
</script>
<style lang="sass" scoped>
	@import "~_app/variables.scss";

	.login {
		padding: 40px;
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		align-items: center;

		&__strip {
			padding: 10px;
			display: flex;
			flex-wrap: wrap-reverse;
			background-color: $color-blue--light;
			border-radius: 8px;

			@media screen and(max-width: $screen-md) {
				justify-content: center;
			}

			@media screen and(max-width: $screen-sm) {
				width: 98vw;
			}
		}

		&__form {
			min-width: 400px;
			padding: 10px;
			flex:1;
			border-radius: 8px;
			z-index:1;
			background-color: $color-blue--base;

			@media screen and(max-width: $screen-md) {
				min-width: 300px;
				width: 100%;
			}

			@media screen and(max-width: $screen-sm) {
				min-width: 100%;
			}
		}

		&__logo {
			min-width: 400px;
			height: 200px;
			display: flex;
			flex: 1;

			@media screen and(max-width: $screen-md) {
				min-width: 100;
				justify-content: center;
			}

			@media screen and(max-width: $screen-sm) {
				min-width: 100%;
				height: 150px;
			}

			img {
				height: 100%;
			}
		}

		&__footer {
			padding: 30px 0;
		}
	}
</style>
