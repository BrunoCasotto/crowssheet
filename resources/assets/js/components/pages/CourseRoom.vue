<template lang="html">
	<div class="course">

		<h4 class="title">{{ course.title }}</h4>
		<div class="course-form">
			<div class="form-group">
				<h4  class="title">{{ course.title }}</h4>
			</div>

			<div class="form-group">
				<p  class="content" v-html="course.description"></p>
			</div>
		</div>

		<!-- class list-->
		<div class="class-list">
			<h4 v-if="classList.length > 0" class="title">Lista de aulas</h4>
			<h4 v-else class="title">Nenhuma aula cadastrada</h4>
			<div class="list">
				<div v-for="classData in classList" class="list__item">
					<div class="item">
						<a :href="'/classroom/'+course.key+'/'+ classData.key">
							<h4 class="item-title" >{{ classData.title }}</h4>
						</a>
						<p class="item-description" v-html="classData.description"></p>
					</div>
				</div>
			</div>
		</div>
		<!-- end class list-->
	</div>
</template>
<script>
	import axios from "axios"
	import growl from "growl-alert"
	import courseService from '_service/course'
	import ClassList from '_components/includes/list/ClassList.vue'

	export default {
		data () {
			return {
				classList: []
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			},
			course: function() {
				return this.$store.state.Course
			}
		},
		mounted() {
			this.filterClassList()
		},
		components: {
			ClassList
		},
		methods: {
			filterClassList() {
				for(var key in this.course.classes) {
					this.course.classes[key]['key'] = key
					this.classList.push(this.course.classes[key])
				}
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	@import "~_config/_commons.scss";

	.course {
		max-width: 700px;

		.title {
			font-size: 25px;
			margin-left: 10px;
		}

		.course-form {
			margin: 20px;

			.form-group {
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
			}
		}

		.class-list {
		width: 100%;
		padding: 10px;

		.title {
			font-size: 20px;
			margin-left: 10px;
		}

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

				a {
					color: $black-base;

					&:hover {
						background-color: lighten($black-base,15);
					}
				}
			}
		}
	}
	}
</style>
