<template lang="html">
	<div>
		<v-header></v-header>
	</div>
	<div class="login">
		<form class="login__form" action="/login" method="post">
			<div class="form-group">
		    	<input v-model="email" type="email" class="form-control" placeholder="Email">
		  	</div>
		  	<div class="form-group">
		    	<input v-model="password" type="password" class="form-control" placeholder="Password">
		  	</div>
		  	<button type="submit" class="btn btn-default">Login</button>
			<a href="/singup" class="btn btn-default" >Singup</a>
		</form>
		<div class="login__background">
			<logo-corvo apperance="background__login" ></logo-corvo>
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
		height: 100%;
		justify-content: center;
		align-items: center;

		&:after {
			content: '';
			display: block;
			width: 100%;
			height: 30%;
			background-color: $color-blue--light;
			position: absolute;
			top:100px;
		}

		&__form {
			width: 400px;
			padding: 10px;
			border-radius: 8px;
			transform: translateY(-25%);
			z-index:1;
			background-color: $color-blue--base;
		}

		&__background {
			padding-left: 10%;
			z-index: 2;
			transform: translateY(-15%);
		}
	}
</style>
