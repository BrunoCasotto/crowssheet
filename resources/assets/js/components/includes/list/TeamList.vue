<template lang="html">
	<div class="team-list">
		<div class="list">
			<div v-for="team in teams" class="list__item">
				<div class="item">
					<a class="item-title" :href="'/team/update?id='+ team.key +'&userId='+ user.uid">
						<h4>{{ team.name }}</h4>
					</a>
				</div>
				<div class="controller">
					<!--<i @click="deleteTeam(index)" class="fa fa-trash remove-button"></i>-->
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
		props: {
			teams: {
				type: Array,
				default: []
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			}
		},
		methods: {
			deleteTeam( index ) {

			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	@import "~_config/_commons.scss";

	.team-list {
		width: 100%;

		.list__item {
			display: flex;
			padding: 5px 20px;
			min-height: 20px;
			margin: 5px auto;
			cursor: pointer;
			border: solid 1px $color-grey--base;
			transition: .5s all ease;
			background-color: white;
			position: relative;

			&:first-child {
				border-top: solid 1px $color-grey--base;
			}

			.item {
				.item-title {
					color: black;
					font-size: 20px;
				}
			}

			.controller {
				padding: 5px;

				.remove-button {
					position: absolute;
					right: 10px;
					top: 10px;
					cursor: pointer;
					font-size: 20px;
				}
			}
		}
	}
</style>
