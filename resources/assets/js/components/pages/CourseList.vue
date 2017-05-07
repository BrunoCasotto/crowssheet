<template lang="html">
	<div class="course-list">
		<div class="list">
			<div v-for="course in courses" class="list__item">
				<div class="item">
					<a class="item-title" :href="'/course/update?id='+ course.key +'&userId='+ user.uid">
						<h4>{{ course.title }}</h4>
					</a>
					<p class="item-description" v-html="course.description"></p>
				</div>
				<div class="controller">
					<i class="btn btn-default btn-delete" @click="deleteCourse( course.key )">Deletar</i>
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

				.item-title {
					color: black;
					font-size: 20px;
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
