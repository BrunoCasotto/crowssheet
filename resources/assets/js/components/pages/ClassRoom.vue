<template lang="html">
<div class="class-room">

	<select class="form-control" v-model="teamSelected">
		<option disabled value="selecione">Selecione um grupo</option>
		 <option v-for="team in teams" v-bind:value="team.key">
			{{ team.name }}
		</option>
	</select>


	<div v-if="courses.length > 0" class="list">
			<div v-for="course in courses" class="list__item">
				<div class="item">
					<a class="item-title" :href="'/classroom/'+course.key">
						<h4>{{ course.title }}</h4>
					</a>
					<p class="item-description" v-html="course.description"></p>
				</div>
			</div>
		</div>
		<div v-else>
			<p>Nenhum curso para exibir.</p>
		</div>


</div>
</template>
<script>
	import CourseService from '_service/course'
	import ClassRoomService from '_service/classRoom'
	import growl from "growl-alert"

	export default {
		data: ()=> {
			return {
				courses: [],
				teams: [],
				teamSelected: 'selecione'
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
		methods: {
			fetchTeams(){
				this.$store.dispatch('toggleLoader', true)
				ClassRoomService
				.getUserTeams(this.user.uid)
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
		watch: {
			teamSelected: function(){
				this.$store.dispatch('toggleLoader', true)
				ClassRoomService
				.getTeamCourses(this.teamSelected)
				.then(response => {
					this.$store.dispatch('toggleLoader', false)
					this.courses = response.data
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
	.class-room {
		max-width: 500px;
		padding: 20px;

		.list {
			.list__item {
				display: flex;
				padding: 5px 20px;
				height: 100px;
				margin: 5px auto;
				cursor: pointer;
				border: solid 1px $color-grey--base;
				transition: .5s all ease;
				background-color: white;

				&:hover {
					height: 200px;
				}

				&:first-child {
					border-top: solid 1px $color-grey--base;
				}

				.item {
					flex: 5;
					overflow: hidden;

					.item-title {
						color: black;
						font-size: 20px;
					}
				}
			}
		}

	}
</style>
