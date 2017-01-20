<template lang="html">
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
			<button class="btn btn-default form__btn" v-on:click="register()">Sing Up</butotn>
		</form>
	</div>
	<div>
		<v-footer></v-footer>
	</div>
</template>

<script>
import VHeader from "_app/components/includes/Header.vue"
import VFooter from "_app/components/includes/Footer.vue"
import axios from 'axios'

export default {
  data () {
    return {}
  },
  components: {
	  VHeader,
	  VFooter
  },
  methods: {
	  register: function() {
		  if(this.validate()){
			axios.post('/auth/singup', {
				name: this.name,
				email: this.email,
				password: this.password
				})
				.then(function (response) {
					console.log(response.data)
					if(response.data.status == true) {
						window.location.replace('/')
					}
				})
				.catch(function (error) {
					console.log(error) 
				})
		  }
	  },
	  validate: function() {
		  return true;
		  if(this.password == this.passwordAgain && this.name.trim().length > 5 && this.email.trim().length > 4) {
			  return true
		  } else {
			  return false
		  }
	  }
  }
}
</script>

<style lang="sass" scoped>
	@import "~_app/variables.scss";

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
			background-color: $color-blue--light;
			position: absolute;
			top:100px;
		}

		.form {
			display: flex;
			width: 100%;
			flex-direction: column;
			padding: 40px;
			background-color: $color-blue--base;
			border-radius: 8px;
			z-index: 100;
			transform: translateY(-50px);
			max-width: 1000px;

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
						width: 49%
					}
				}
			}

			&__btn {
				margin: 10px 0;
				max-width: 180px;
			}

			.input {
				font-weight: 200;
				width: 100%;
				padding: 0.75em;
				border: none;
				font-size: 1.2rem;
				line-height: 1.85em;
				border-radius: 8px;

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
