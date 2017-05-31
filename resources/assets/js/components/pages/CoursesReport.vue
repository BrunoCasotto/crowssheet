<template>
	<div class="course-report">
		<div class="course-report__header">
			<!--course select-->
			<select v-if="courses.length > 0" class="form-control" v-model="courseSelected">
				<option disabled value="select">Selecione o curso</option>
				<option v-for="course in courses" v-bind:value="course.key">
					{{ course.title }}
				</option>
			</select>
			<h4 v-else> Nenhum curso cadastrado.</h4>
		</div>
		<div class="course-report__content">
			<ul class="nav nav-tabs">
				<li v-bind:class="{ 'active': tab=='course' }">
					<a href="#">Detalhes do curso</a>
				</li>
				<li v-bind:class="{ 'active': tab=='class' }">
					<a href="#">Historico da aula</a>
				</li>
			</ul>
			<!-- course content -->
			<div v-if="singleCourse" v-show="tab=='course'" class="content__course">
				<h4>{{ singleCourse.title }}</h4>
				<label class="title">Descrição</label>
				<p class="lead text" v-html="singleCourse.description"></p>
				<label class="title">Total de aulas cadastradas</label>
				<p class="lead text">{{ classes.length }}</p>

				<!-- course class list -->
				<ul class="list-group content__course__classes">
					<li
						v-for="classData in classes" 
						@click="getClassDetails(classData)" 
						class="list-group-item"
					> {{ classData.title }} </li>
				</ul>
			</div>
			<h4 v-else>Selecione um curso</h4>

			<div v-if="singleClass" v-show="tab=='class'" class="content__class">
				<h4>{{ singleClass.title }}</h4>

				<template v-if="singleClass.test.history.length > 0">
					<label class="title">Numero de atividades entregues</label>
					<p class="lead text">{{singleClass.test.history.length}}</p>

					<label class="title">Média de notas dos alunos</label>
					<p class="lead text">{{singleClass.test.average}}</p>

					<div v-if="singleClass.test" class="history__list">
						<label class="title">Histórico de entregas</label>
						<template v-for="history_item in singleClass.test.history">
							<blockquote class="history__list__item">

								<div class="item__line">
									<label>Aluno </label>
									<p class="lead"> {{ history_item.userName }} </p>

									<label>Data </label>
									<p class="lead"> {{ filterDate ( history_item.date ) }} </p>
								</div>

								<div class="item__line">
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
				</template>
				<h4 v-else> Nenhum registro.</h4>
			</div>
		</div>
	</div>
</template>

<script>
	import ReportService from '_service/report'
	import CourseService from '_service/course'
	import moment from 'moment'
	import growl from "growl-alert"

	export default {
		data() {
			return {
				courses: [],
				classes: [],
				history: [],
				courseSelected: 'select',
				singleCourse: null,
				singleClass: null,
				showClass: false,
				tab: 'course',
				stats: {}
			}
		},
		mounted() {
			this.fetchCourses();
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			}
		},
		watch: {
			'courseSelected': function() {
				this.getSingleCourse()
			}
		},
		methods: {
			fetchCourses() {
				this.$store.dispatch ( 'toggleLoader', true )
				CourseService
				.getAll( this.user.uid )
				.then( response => {
					if(response.data) {
						this.courses = response.data
					}

					this.$store.dispatch ( 'toggleLoader', false )
				})
				.catch(error => { 
					this.$store.dispatch ( 'toggleLoader', false )
				})
			},
			getSingleCourse() {
				this.$store.dispatch ( 'toggleLoader', true )
				this.classes = []
				this.tab = 'course'
				CourseService
				.getSingle( this.user.uid, this.courseSelected )
				.then( response => {
					if(response.data) {
						this.singleCourse = response.data
						this.showClass = true

						if( this.singleCourse.classes ) {
							for(var key in this.singleCourse.classes) {
								this.singleCourse.classes[key]['key'] = key
								this.classes.push( this.singleCourse.classes[key] )
							}
						}
					}

					this.$store.dispatch ( 'toggleLoader', false )
				})
				.catch(error => { 
					this.$store.dispatch ( 'toggleLoader', false )
				})
			},
			getClassDetails( classData ) {

				if( classData.test ) {
					this.singleClass = classData
					this.tab = 'class'
					this.singleClass.test.history = this.singleClass.test.history ? JSON.parse(this.singleClass.test.history) : []

					this.singleClass.test.average = this.getAverage( this.singleClass.test.history )
				} else {
					growl.warning("Aula sem nenhum registro.")
				}
			},
			getAverage( history ) {
				let average = 0;
				let testNumber 	= history.length

				if( history.length > 0 ) {
					history.forEach( test=> {
						average 	+= parseFloat( test.score )
					})
					average = average / testNumber
				}

				return parseFloat(average).toFixed(2)
			},
			filterDate( date ) {
				return moment( date ).format("DD-MM-YYYY")
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	@import "~_config/_commons.scss";

	.course-report {
		width: 100%;
		max-width: 500px;

		&__header {
			padding: 10px;

			.select {
				margin-top: 10px;
			}
		}

		&__content {
			padding: 10px;

			.nav {
				li {
					a {
						font-size: 18px;
						font-weight: bold;
						color: black;

						&:hover, &:active {
							margin-right: 2px;
							background: none;
							cursor: not-allowed;
							font-size: 18px;
						}
					}
				}
			}

			.title {
				font-size: 20px;
				margin: 0;
			}

			.text {
				margin-left: 5px;
			}

			.content__course {
				&__classes {
					li {
						cursor: pointer;
						font-weight: bold;
						&:hover {
							color: white;
							background: $color-grey-blue-light;
						}
					}
				}
			}

			.content__class {
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
		}
	}

	.lead {
		margin-left: 5px;
		margin-bottom: 5px;
		font-size: 16px;
	}

</style>