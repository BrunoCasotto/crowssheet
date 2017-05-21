<template lang="html">
   	<div class="dashboard">
		<!-- information -->
		<div class="dashboard-home">
			<div class="content__info">
				<template v-for="block in blocks">
					<div class="block">
						<text-block
						appearance="block--sm"
						:color="block.color"
						:font="block.font"
						:title="block.title"
						:text="block.text"
						></text-block>
					</div>
				</template>
			</div>
		</div>
		<!-- end information -->

		<!--User level-->
		<div v-if="!user.teacher" class="dashboard-status">
			<user-level :status="userData.status"></user-level>
			<achievement-list :achievements="achievements"></achievement-list>
		</div>
		<div class="dashboard-metrics">

		</div>
		<!--end User level-->
	</div>
</template>
<script>
	import TextBlock from "_common/components/Text-block.vue"
	import Logo from "_common/components/Logo.vue"
	import Loader from '_common/components/Loader.vue'
	import UserLevel from '_components/includes/UserLevel.vue'
	import AchievementList from '_components/includes/list/AchievementList.vue'
	import userService from '_service/user'
	import reportService from '_service/report'
	import growl from "growl-alert"

	export default {
		name: 'Dashboard',
		data() {
			return {
				blocks: []
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			},
			userData: function () {
				return this.$store.state.CompleteUser
			}
		},
		mounted() {
			this.fillBlocks()
			this.filterStats()
		},
		methods: {
			filterStats () {
				if(this.userData.status.achievements) 
					this.achievements = JSON.parse(this.userData.status.achievements)
				else
					this.achievements = []
			},
			fillBlocks () {
				if(this.user.teacher) {
					this.fillStudents()
					this.fillCourses()
					this.fillMycourses()
				} else {
					this.fillMyteams()
					this.fillMyAverage()
					this.fillMyfinishTests()
				}
			},
			fillStudents() {
				let students = 0
				if(this.userData.teams) {
					for(var key in this.userData.teams) {
						students += JSON.parse(this.userData.teams[key].users).length
					}
				}

				//setting the block
				this.blocks.push({
					color: '#ff9400',
					title: 'Numero de alunos',
					text: students,
					font: 'black'
				})
			},
			fillCourses() {
				let courses = 0
				if(this.userData.teams) {
					for(var key in this.userData.teams) {
						courses += JSON.parse(this.userData.teams[key].courses).length
					}
				}

				//setting the block
				this.blocks.push({
					color: '#000',
					title: 'Cursos disponibilizados',
					text: courses,
					font: 'white'
				})
			},
			fillMycourses() {
				let courses = 0
				if(this.userData.courses) {
					courses = Object.keys(this.userData.courses).length
				}

				//setting the block
				this.blocks.push({
					color: '#d71e1e',
					title: 'Total de cursos cadastrados',
					text: courses,
					font: 'black'
				})
			},
			fillMyteams() {
				let teams = 0
				if(this.userData.teams) {
					teams = JSON.parse(this.userData.teams).length
				}

				//setting the block
				this.blocks.push({
					color: '#ff9400',
					title: 'Numero de times que participo',
					text: teams,
					font: 'black'
				})
			},
			fillMyAverage () {
				let average 	= parseFloat(0)
				let history 	= JSON.parse(this.userData.status.completedTests)
				let testNumber 	= history.length
				if(history.length > 0) {
					history.forEach( test=> {
						average 	+= parseFloat(test.score)
					})
					average 		= average / testNumber
				}
				//setting the block
				this.blocks.push({
					color: '#000',
					title: 'Média de notas',
					text: parseFloat(average).toFixed(2),
					font: 'white'
				})
			},
			fillMyfinishTests() {
				let history 	= JSON.parse(this.userData.status.completedTests)

				//setting the block
				this.blocks.push({
					color: '#d71e1e',
					title: 'Total de atividades concluidas',
					text: history.length,
					font: 'white'
				})
			}
		},
		components: {
			TextBlock,
			UserLevel,
			AchievementList
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	.dashboard {
		padding-top: 20px;

		.content__info {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			align-content: center;
			width: 97%;
			margin: 0 auto;
			
			.block {
				margin: 5px;
				display: flex;
				justify-content: center;
			}

			@media screen and(max-width: $screen-md) {
				top: 0px;
			}

			@media screen and(max-width: $screen-xs) {
				display: block;
			}

		}
		
		.dashboard-home {
			width: 100%;
			margin: 0 auto;
		}

		.dashboard-status {
			padding: 10px;
			margin: 10px 0;

			@media screen and(max-width: $screen-sm) {
				justify-content: center;
			}
		}
	}
</style>
