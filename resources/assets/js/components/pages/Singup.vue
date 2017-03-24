<template lang="html">
	<div>
		<div>
			<v-header></v-header>
		</div>
		<div class="container singup">
			<form class="form" v-on:submit.prevent>
				<label class="form__title">Singup</label>
				<div class="form__row">
				<div class="col col--md">
					<input 
					type="text" 
					name="name" 
					placeholder="name" 
					class="input input--blank"
					v-model="name"
					>
				</div>
				<div class="col col--md">
					<input 
					type="text" 
					name="email" 
					placeholder="e-mail" 
					class="input input--blank"
					v-model="email"
					>
				</div>
				</div>
				<div class="form__row">
				<div class="col col--md">
					<input 
					type="password" 
					name="password" 
					placeholder="password" 
					class="input input--blank"
					v-model="password"
					>
				</div>
				<div class="col col--md">
					<input 
					type="password"
					name="passwordAgain" 
					placeholder="password again" 
					class="input input--blank"
					v-model="passwordAgain"
					>
				</div>
				</div>
				<button class="btn btn-default form__btn" @click="register">Sing Up</butotn>
			</form>
		</div>
	</div>
</template>

<script>
	import VHeader from "_components/includes/Header.vue"
	import VFooter from "_components/includes/Footer.vue"
	import axios from 'axios'
	import growl from "growl-alert"
	import authService from '_service/auth'

	export default {
		data () {
			return {
				name: '',
				email: '',
				password: '',
				passwordAgain: '',
				photo:'http://wpshowdown.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
			}
		},
		components: {
			VHeader,
			VFooter
		},
		methods: {
			register () {
				authService
				.singup({
					name: this.name,
					email: this.email,
					password: this.password,
					photo: this.photo
				})
				.then(response => {
					console.log(response)
					if(response.data.status == true) {
						window.location.replace('/')
					}
				})
				.catch(error => {
					console.log(error)
				})
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";

	.singup {
		width: 100%;
		height: calc(100vh - #{$header-height});
		display: flex;
		justify-content: center;
		align-items: center;

		&:after {
			content: '';
			display: block;
			width: 100%;
			height: 30%;
			background-color: $orange-base;
			position: absolute;
			top:100px;
		}

		.form {
			display: flex;
			width: 100%;
			flex-direction: column;
			padding: 40px;
			background-color: $black-base;
			border-radius: 8px;
			z-index: 100;
			transform: translateY(-50px);
			max-width: 1000px;
			@media screen and(max-width: $screen-md) {
				padding: 20px;
				margin-top: 50px;
			}

			&__title {
				font-size: 3rem;
				color: white;
			}

			&__row {
				display: flex;
				flex-flow: row wrap;
				width: 100%;
				width: 100%;

				.col {
					width: 100%;
					display: flex;
					margin: 0.5%;

					&--md {
						flex: 1;
    					min-width: 200px;
					}
				}
			}

			&__btn {
				margin: 10px 0;
				max-width: 180px;

				@media screen and(max-width: $screen-md) {
					max-width: 100%;
				}
			}

			.input {
				font-weight: 200;
				width: 100%;
				padding: 0.75em;
				border: none;
				font-size: 1.2rem;
				line-height: 1.85em;
				border-radius: 8px;
				@media screen and(max-width: $screen-md) {
					line-height: 1em;
				}

				&--border {
					border-radius: 8px;
					box-shadow: inset 0px 2px 3px 1px rgba(0, 0, 0, 0.05), 0px 1px 0px 0px rgba(255, 255, 255, 0.025);
				}

				&--blank {
					background: #f4f4f4;
				}

				&--dark {
					background: #282828;
				}

				&--message {
					height: 15em;
					padding: 0.30em 0 12em 0.7em;
					width: 100%;
					padding: 0.75em;
					box-shadow: inset 0px 2px 3px 1px rgba(0, 0, 0, 0.05), 0px 1px 0px 0px rgba(255, 255, 255, 0.025);
					background: #282828;
					border: none;
					border-radius: 8px;
					font-size: 1.4rem;
					line-height: 1.85em;

					&__message {
						height: 15em;
						padding: 0.30em 0 12em 0.7em;

					}
				}
			}
		}
	}
</style>
