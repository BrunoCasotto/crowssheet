<template lang="html">
   	<div class="team-form">
		<div class="team-form__content">
			<form v-on:submit.prevent>
				<label>Nome da equipe</label>
				<div class="form-group">
					<input v-model="team.name" class="form-control">
					<button @click="store()" class="btn btn-salvar">Criar</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
	import growl from "growl-alert"
	import TeamService from '_service/team'

	export default {
		data: ()=> {
			return {
				team: {
					name: ''
				}
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			}
		},
		methods: {
			store () {
				if ( this.validate() ) {
					this.$store.dispatch('toggleLoader', true)
					TeamService
					.store( this.user.uid , this.team )
					.then(response => {
						this.$store.dispatch('toggleLoader', false)
						growl.success("Time salvo")
					})
					.catch(error => {
						this.$store.dispatch('toggleLoader', false)
						growl.error('Ocorreu algum erro') 
					})
				}
			},
			validate () {
				if ( this.team.name.length < 3 ) {
					growl.warning("O nome do grupo deve conter no mínimo 3 letras.")
					return false
				} else {
					return true
				}
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	.team-form {
		width: 100%;

		.team-form__content {
			margin: 20px auto;
			padding: 0 20px;

			form {
				max-width: 600px;
				height: 60px;
			
				.form-group {
					display: flex;
					.btn-salvar {
						background-color: $red-base;
						color: white;
						font-weight: bold;
						margin-left: 10px;

						&:hover {
							background-color: darken( $red-base ,20);
						}
					}
				}
			}
		}
	}

</style>
