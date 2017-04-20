<template lang="html">
	<div class="course-list">
		<div class="list">
			<div class="list__item">
				<div class="item">
					<h4 class="item-title" >Aula 1</h4>
					<p class="item-description" v-html="">
						Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60
					</p>
				</div>
				<div class="controller">
					<a href="/classroom/course.key/aula.key" class="btn btn-default btn-update">Iniciar</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import CourseService from '_service/course'
	import growl from "growl-alert"
	import ClassModal from '_common/components/modal/ClassModal.vue'

	export default {
		name: 'course-list',
		data: ()=> {
			return {
				courses: []
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			}
		},
		mounted (){
			this.fetchCourses()
		},
		components: {
			ClassModal
		},
		methods: {
			fetchCourses() {
				this.$store.dispatch('toggleLoader', true)
				CourseService.getAll(this.user.uid)
				.then(response => {
					this.$store.dispatch('toggleLoader', false)
					this.courses = response.data
				})
				.catch(error => {
					this.$store.dispatch('toggleLoader', false)
					growl.error('Ocorreu algum erro') 
				})
			},
			deleteCourse( id ) {
				this.$store.dispatch('toggleLoader', true)
				CourseService.delete( this.user.uid, id )
				.then(response => {
					if(response.status) {
						this.$store.dispatch('toggleLoader', false)
						growl.success('Item descartado.')
						this.fetchCourses()
					} else {
						this.fetchCourses()
						growl.warning('Tente novamente') 
					}
				})
				.catch(error => {
					this.$store.dispatch('toggleLoader', false)
					growl.error('Ocorreu algum erro') 
				})
			},
			updateCourse(key) {
				this.courses.forEach((item)=>{
					if(item.key == key) {
						this.$store.dispatch('toggleModal', {
							type: 'course-form',
							active: true,
							data: item
						})
					}
				})
			}
		},
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	.course-list {
		width: 100%;
		max-width: 700px;
		margin: 20px;

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

				.btn-update {
					background-color: $red-base;

					&:hover {
						background-color: lighten($red-base,15);
					}
				}

				.btn-delete {
					background-color: $black-base;
					&:hover {
						background-color: lighten($black-base,15);
					}
				}

			}
		}
	}
</style>
