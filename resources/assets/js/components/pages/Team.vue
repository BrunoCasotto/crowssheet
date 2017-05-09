<template lang="html">
	<div class="team">
		<div class="team-form">
			<form v-on:submit.prevent>
				<label class="title">Nome da equipe</label>
				<div class="form-group">
					<input v-model="team.name" class="form-control">
					<button @click="store()" class="btn btn-orange">Criar</button>
				</div>
			</form>
		</div>
		<div class="team-list">
			<team-list :teams="teams"></team-list>
		</div>
	</div>
</template>
<script>
	import CourseService from '_service/course'
	import growl from "growl-alert"
	import TeamList from '_components/includes/list/TeamList.vue'
	import teamService from '_service/team'

	export default {
		data() {
			return {
				team: {
					name: '',
					users: JSON.stringify([])
				},
				teams: []
			}
		},
		mounted() {
			this.fetch()
		},
		components: {
			TeamList
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
					teamService
					.store( this.user.uid , this.team )
					.then(response => {
						this.$store.dispatch('toggleLoader', false)
						growl.success("Time salvo")
						this.team.name = ''
						this.fetch()
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
			},
			fetch() {
				this.$store.dispatch('toggleLoader', true)
				teamService.getAll(this.user.uid)
				.then(response => {
					this.$store.dispatch('toggleLoader', false)
					this.teams = response.data
				})
				.catch(error => {
					this.$store.dispatch('toggleLoader', false)
					growl.error('Ocorreu algum erro') 
				})
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	@import "~_config/_commons.scss";
	.team {
		max-width: 500px;

		&-form {
			padding-top: 20px;

			form {
				width: 100%;

				.title {
					font-size: 20px;
				}

				.form-group {
					display: flex;

					input {
						margin-right: 5px;
					}

					.btn {
						margin: 0;
					}
				}
			}
		}
	}
</style>
