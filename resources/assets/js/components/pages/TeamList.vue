<template lang="html">
	<div class="team-list">
		<div class="list">
			<div v-for="team in teams" class="list__item">
				<div class="item">
					<a class="item-title" :href="'/course/update?id='+ course.key +'&userId='+ user.uid">
						<h4>{{ team.title }}</h4>
					</a>
				</div>
				<div class="controller">
					<i class="btn btn-default btn-delete" @click="deleteCourse( team.key )">Deletar</i>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import growl from "growl-alert"
	import TeamForm from '_components/includes/form/TeamForm.vue'
	import teamService from '_service/team'

	export default {
		data() {
			return {
				teams: []
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			}
		},
		mounted() {
			this.fetch()
		},
		methods: {
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

			.controller {
				padding: 5px;
				flex: 1;
			}
		}
	}
</style>
