<template lang="html">
	<div class="team">
		<div class="form-group">
			<input v-if="edit" class="form-control" v-model="team.name">
			<h4 v-else class="title">{{ team.name }}</h4>

			<button v-if="edit" @click="update" class="btn btn-black btn-save">salvar</button>
			<i v-else @click="toggleEdit" class="fa fa-pencil"></i>

		</div>

		<!-- users list and form to insert users-->
		<div v-if="insert" class="insert-users">
			<h4 v-show="!edit" class="title">Lista de usuários</h4>
			<div class="list">
				<div v-for="user in users" class="list__item">
					<i @click="insertUser(user.uid)" class="btn btn-black btn-status">Inserir</i>
					<div class="item">
						<div class="description">
							<!--<img :src="user.photo" alt="" height="50" width="50">-->
							<h4 class="name" >{{ user.name }}</h4>
						</div>
						<p class="email">{{user.email}}</p>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="team-users">
			<h4 v-show="!edit" class="title">Lista de usuários do time</h4>
			<div v-if="team.users.length > 0" class="list">
				<div v-for="user in team.users" class="list__item">
					<i @click="removeUser(user.uid)" class="fa fa-trash btn-remove"></i>
					<i class="btn btn-black btn-status">Ver status</i>
					<div class="item">
						<div class="description">
							<!--<img :src="user.photo" alt="" height="50" width="50">-->
							<h4 class="name" >{{ user.name }}</h4>
						</div>
						<p class="email">{{user.email}}</p>
						
					</div>
				</div>
			</div>
			<div v-else>Nenhum usuário cadastrado</div>
		</div>
		<i v-if="insert" @click="toggleInsert" class="btn btn-orange">voltar</i>
		<i  v-else @click="toggleInsert" class="btn btn-red">Inserir usuário</i>
	<!-- End list and insert users-->

	<div class="line"></div>

	<!-- List course and insert -->
		<div v-if="insert_courses" class="insert-courses">
			<h4 class="title">Lista de cursos</h4>
			<div class="list">
				<div v-for="course in courses" class="list__item">
					<i @click="insertCourse(course.key)" class="btn btn-black btn-status">Inserir</i>
					<div class="item">
						<div class="description">
							<a class="item-title" :href="'/course/update?id='+ course.key +'&userId='+ user.uid">
								<h4 class="name" >{{ course.title }}</h4>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="team-courses">
			<h4 class="title">Lista de cursos do time</h4>
			<div v-if="team.courses.length > 0" class="list">
				<div v-for="course in team.courses" class="list__item">
					<i @click="removeCourse(course.key)" class="fa fa-trash btn-remove"></i>
					<div class="item">
						<div class="description">
							<a class="item-title" :href="'/course/update?id='+ course.key +'&userId='+ user.uid">
								<h4 class="name" >{{ course.title }}</h4>
							</a> 
						</div>
					</div>
				</div>
			</div>
			<div v-else>Nenhum curso cadastrado</div>
		</div>
		<i v-if="insert_courses" @click="toggleInsertCourse" class="btn btn-orange">Voltar</i>
		<i  v-else @click="toggleInsertCourse" class="btn btn-red">Inserir curso</i>
	</div>
	<!-- -->
</template>
<script>
	import CourseService from '_service/course'
	import growl from "growl-alert"
	import TeamList from '_components/includes/list/TeamList.vue'
	import teamService from '_service/team'

	export default {
		data() {
			return {
				edit: false,
				insert: false,
				insert_courses: false,
				teamUsers: []
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			},
			team: function () {
				return this.$store.state.Team
			},
			users: function () {
				return this.$store.state.Users
			},
			courses: function () {
				return this.$store.state.Courses
			}
		},
		methods: {
			insertUser( userId ) {
				this.$store.dispatch('toggleLoader', true)
				teamService
				.insertUser( userId, this.team.key )
				.then(response => {
					if (response.data.status) {
						this.$store.dispatch('toggleLoader', false)
						growl.success('Inserido com sucesso')
						window.location.reload()
						this.toggleInsert()
					} else {
						this.$store.dispatch('toggleLoader', false)
						growl.error(response.data.message)
					}
				})
				.catch(error => {
					this.$store.dispatch('toggleLoader', false)
					growl.error(error.data.message)
				})
				this.$store.dispatch('toggleLoader', false)
			},
			removeUser( userId ) {
				this.$store.dispatch('toggleLoader', true)
				teamService
				.removeUser(userId, this.team.key )
				.then(response => {
					if (response.data.status) {
						this.$store.dispatch('toggleLoader', false)
						growl.success('Removido com sucesso')
						window.location.reload()
					} else {
						this.$store.dispatch('toggleLoader', false)
						growl.error(response.data.message)
					}
				})
				.catch(error => {
					this.$store.dispatch('toggleLoader', false)
					growl.error(error.data.message)
				})
				this.$store.dispatch('toggleLoader', false)
			},
			removeCourse( courseId ) {
				this.$store.dispatch('toggleLoader', true)
				teamService
				.removeCourse(courseId, this.team.key )
				.then(response => {
					if (response.data.status) {
						this.$store.dispatch('toggleLoader', false)
						growl.success('Curso removido com sucesso')
						window.location.reload()
					} else {
						this.$store.dispatch('toggleLoader', false)
						growl.error(response.data.message)
					}
				})
				.catch(error => {
					this.$store.dispatch('toggleLoader', false)
					growl.error(error.data.message)
				})
				this.$store.dispatch('toggleLoader', false)
			},
			insertCourse( courseId ) {
				this.$store.dispatch('toggleLoader', true)
				teamService
				.insertCourse(courseId, this.team.key )
				.then(response => {
					if (response.data.status) {
						this.$store.dispatch('toggleLoader', false)
						growl.success('Curso inserido com sucesso')
						window.location.reload()
						this.toggleInsertCourse()
					} else {
						this.$store.dispatch('toggleLoader', false)
						growl.error(response.data.message)
					}
				})
				.catch(error => {
					this.$store.dispatch('toggleLoader', false)
					growl.error(error.data.message)
				})
				this.$store.dispatch('toggleLoader', false)
			},
			update() {
				this.$store.dispatch('toggleLoader', true)
				teamService
				.update(this.user.uid, this.team.key, { name: this.team.name } )
				.then(response => {
					if (response.data.status) {
						this.$store.dispatch('toggleLoader', false)
						growl.success('Salvo')
						this.toggleEdit()
					} else {
						this.$store.dispatch('toggleLoader', false)
						growl.error(response.data.message)
					}
				})
				.catch(error => {
					this.$store.dispatch('toggleLoader', false)
					growl.error(error.data.message)
				})
				this.$store.dispatch('toggleLoader', false)
			},
			toggleInsert(){
				this.insert = !this.insert
			},
			toggleInsertCourse() {
				this.insert_courses = !this.insert_courses
			},
			toggleEdit() {
				this.edit = !this.edit
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	@import "~_config/_commons.scss";

	.team {
		max-width: 500px;
		padding: 15px;

		.form-group {
			display: flex;

			i {
				line-height: 100%;
				padding-top: 15px;
				margin-left: 10px;
				cursor: pointer;
			}

			.btn-save {
				margin: 0 0 0 5px;
			}
		}

		.title {
			font-size: 20px;
			display: flex;

			&:before {
				content: '';
				display: block;
				margin-right: 5px;
				width: 10px;
				height: 10px;
				background-color: $orange-base;
				border-radius: 50%;
				margin-top: 9px;
				opacity: 0.35;
			}
		}

		.team-users, .insert-users, .insert-courses, .team-courses {
			width: 100%;

			.list__item {
				display: flex;
				padding: 5px 20px;
				max-height: 100px;
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

					.item-title {
						color: black;
						font-size: 20px;
					}
				}

				.btn-remove {
					right: 10px;
					top: 10px;
					cursor: pointer;
					font-size: 20px;
					position: absolute;
				}

				.btn-status {
					right: 10px;
					bottom: 10px;
					width: 100px;
					cursor: pointer;
					position: absolute;
					margin-right: 0;
				}

			}
		}

		.line {
			margin-top: 10px;
			margin-bottom: 10px;
			border-top: solid 1px $orange-base;
			width: 100%;
		}
	}
</style>
