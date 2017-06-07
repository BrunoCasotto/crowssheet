<template lang="html">
	<div class="user-stats">
		<ul class="nav nav-tabs">
			<li v-bind:class="{ 'active': tab=='profile' }">
				<a @click="tab = 'profile'" href="#">Perfil</a>
			</li>
			<li v-bind:class="{ 'active': tab=='history' }">
				<a href="#" @click="tab = 'history'">Historico de atividades</a>
			</li>
		</ul>

		<div v-if="tab == 'profile'">
			<h4>{{ user.name }}</h4>
			<label>Email:</label>
			<p class="lead">{{ user.email }}</p>
			<label>Média do aluno:</label>
			<p class="lead">{{ filterAverage(average) }}</p>
			<label>Atividades finalizadas:</label>
			<p class="lead">{{ totalTests }}</p>
			<user-level :status="user.status"></user-level>
			<avatar :level="user.status.level" ></avatar>
		</div>

		<div v-if="tab == 'history'">
			<div class="history__list">
				<template v-for="history_item in history">
					<blockquote class="history__list__item">

						<div class="item__line">
							<label>Curso </label>
							<p class="lead"> {{ history_item.courseTitle }} </p>
							<label>Aula </label>
							<p class="lead"> {{ history_item.classTitle }} </p>
						</div>

						<div class="item__line">
							<label>Data </label>
							<p class="lead"> {{ filterDate ( history_item.date ) }} </p>
							<label>Nota </label>

							<p v-if=" history_item.score >= 6" class="bg-primary score"> {{ history_item.score }} </p>
							<p v-else class="bg-danger score"> {{ history_item.score }} </p>
						</div>

						<div class="item__line" v-if="history_item.achievement">
							<label>Item utilizado </label>
							<p class="lead"> {{ history_item.achievement.name }} </p>
							<label>Descrição </label>
							<p class="lead"> {{ history_item.achievement.description }} </p>
						</div>
					</blockquote>
				</template>

			</div>
		</div>
	</div>
</template>
<script>
	import TextBlock from "_common/components/Text-block.vue"
	import UserLevel from '_components/includes/UserLevel.vue'
	import moment from 'moment'
	import Avatar from '_components/includes/Avatar.vue'

	export default {
		data() {
			return {
				totalTests: 0,
				tab: 'profile',
				history: [],
				average: 0
			}
		},
		computed: {
			user: function () {
				return this.$store.state.CompleteUser
			}
		},
		mounted() {
			this.fetch()
			this.fetchAverage()
		},
		methods: {
			fetch() {
				this.history = JSON.parse( this.user.status.completedTests )
				this.totalTests = this.history.length
			},
			fetchAverage() {
				this.average 	= parseFloat(0)
				let history 	= JSON.parse( this.user.status.completedTests )
				let testNumber 	= history.length
				if( history.length > 0 ) {
					history.forEach( test=> {
						this.average 	+= parseFloat( test.score )
					})
					this.average = this.average / testNumber
				}
			},
			filterDate( date ) {
				return moment( date ).format("DD-MM-YYYY")
			},
			filterAverage( value ) {
				return parseFloat(value).toFixed(2)
			}
		},
		components: {
			UserLevel,
			TextBlock,
			Avatar
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	@import "~_config/_commons.scss";

	.user-stats {
		max-width: 500px;
		width: 100%;
		padding: 10px;

		.history__list {
			width: 100%;

			&__item {
				border-bottom: 1px $color-grey-blue-light;
				margin-top: 10px;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				max-width: 400px;

				.score {
					text-align: center;
				}

				.item__line {
					margin-left: 5px;
				}

				span {
					margin: 0;
				}
			}
		}
	}

	.lead {
		margin-left: 5px;
		margin-bottom: 5px;
		font-size: 16px;
	}

	.line {
		width: 100%;
		height: 1px;
		background-color: $color-grey-blue-light;
		opacity: 0.4;
	}

	a {
		color: black;
		font-weight: bold;
	}
</style>
