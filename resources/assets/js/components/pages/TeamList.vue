<template lang="html">
	<div class="team-list">
		<div class="list">
			<team-form></team-form>
			<div v-for="team in teams" class="list__item">
				<div class="item">
					<div class="description">
						<h4 class="name" >{{ team.name }}</h4>
					</div>
				</div>
				<div class="controller">
					<i class="btn btn-default btn-insert" @click="updateCourse( user.key )">Ver status</i>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import TeamService from '_service/team'
	import growl from "growl-alert"
	import ClassModal from '_common/components/modal/ClassModal.vue'
	import TeamForm from '_components/TeamForm.vue'

	export default {
		name: 'course-list',
		data: ()=> {
			return {
				teams: []
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			}
		},
		mounted (){
			this.fetchTeams()
		},
		components: {
			ClassModal,
			TeamForm
		},
		methods: {
			fetchTeams() {
				this.$store.dispatch('toggleLoader', true)
				TeamService.getAll( this.user.uid )
				.then(response => {
					this.$store.dispatch('toggleLoader', false)
					this.teams = response.data
				})
				.catch(error => {
					this.$store.dispatch('toggleLoader', false)
					growl.error('Ocorreu algum erro') 
				})
			}
		},
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";

	.team-list {
		width: 100%;
		max-width: 500px;

		.list__item {
			display: flex;
			padding: 5px 20px;
			height: 100px;
			margin: 5px auto;
			cursor: pointer;
			border: solid 1px $color-grey--base;
			transition: .5s all ease;
			background-color: white;

			&:first-child {
				border-top: solid 1px $color-grey--base;
			}

			.item {
				flex: 5;
				overflow: hidden;

				.description {
					display: flex;

					img {
						padding: 5px;
					}

					.name {
						font-weight: bold;
					}
				}

				.email {
					margin-top: 10px;
				}
			}

			.controller {
				padding: 5px;
				flex: 1;

				.btn {
					min-width: 100px;
					color: white;
					font-weight: bold;
					margin-left: auto;
				}

				.btn-insert {
					background-color: $red-base;

					&:hover {
						background-color: lighten($red-base,15);
					}
				}
			}
		}
	}
</style>
