<template lang="html">
	<div class="course-list">
		<div class="list">
			<div v-for="course in courses" class="list__item">
				<div class="item">
					<h4 class="item-title" >{{ course.title }}</h4>
					<p class="item-description" v-html="course.description"></p>
				</div>
				<div class="controller">
					<i class="fa fa-pencil button"></i>
					<i class="fa fa-trash button" @click="deleteCourse( course.key )"></i>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import CourseService from '_service/course'
	import growl from "growl-alert"

	export default {
		name: 'course-list',
		data: ()=> {
			return {
				courses: []
			}
		},
		mounted (){
			this.fetchCourses()
		},
		methods: {
			fetchCourses() {
				this.$store.dispatch('toggleLoader', true)
				CourseService.getAll()
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
				CourseService.delete( id )
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
			updateCourse() {

			}
		},
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	.course-list {
		margin: 20px 0;
		.list__item {
			display: flex;    
			justify-content: space-between;
			padding: 5px 20px;
			border: solid 1px $color-grey--base;
			height: 100px;
			max-width: 600px;
			margin: 5px auto;

			&:first-child {
				border-top: solid 1px $color-grey--base;
			}

			.item {

			}
			.controller {
				.button {
					cursor: pointer;
					padding: 2px;
				}
			}
		}
	}
</style>
