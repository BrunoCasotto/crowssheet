<template lang="html">
   	<div class="course-form">
		<div class="form-header">
			<h4 class="title">Cadastro de curso</h4>
		</div>
		<div class="container course-form__content">
			<form>
				<div class="form">
					<div class="form-group">
						<label for="exampleInputEmail1">Matéria/Titulo</label>
						<input class="form-control" v-model="course.title">
					</div>
					<div class="form-group">
						<label for="exampleInputEmail1">Descrição</label>
						<textarea class="form-control" rows="5" v-model="course.description"></textarea>
					</div>
					<list-classes appearance="list--sm"></list-classes>
				</div>
				<div class="config">
					<!--<div class="well input-file"></div>-->
					<a class="btn btn-default btn-salvar">Salvar</a>
				</div>
			</form>
  				
		</div>
	</div>
</template>
<script>
	import axios from "axios"
	import growl from "growl-alert"
	import moment from 'moment'
	import listClasses from '_common/components/ListClasses.vue'

    export default {
		components: {
			listClasses
		},
		data () {
			return {
				course: {
					title: '',
					description: ''
				}
			}
		},
		methods: {
			// storePost () {
			// 	axios.post('/post/save', {
			// 		post: this.post
			// 	})
			// 	.then(response => {
			// 		if (response.data) {
			// 			this.post.title = ""
			// 			this.post.text = ""
			// 			growl.success('Postado')
			// 		}
			// 	})
			// 	.catch(error => {
			// 		growl.error('Ocorreu um erro')
			// 	})
			// },
			// fetchData () {
			// 	axios.get('/json/post/all/category')
			// 		.then(response => {
			// 			this.categories = response.data
			// 		})
			// 		.catch(error => {})
			// },
			// getPreviousMain () {
			// 	this.post.text = tinymce.get('tiny-text-area').getContent()
			// }
		}
    }
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	
	.course-form {
		width: 100%;

		.form-header {
			width: 100%;
			text-align: center;

			.title {
				margin: 10px auto;
			}
		}

		&__content {
			max-width: 1000px;
			margin: 20px auto;
			@media screen and(min-width: $screen-sm) {
				display: flex;
			}

			form {
				display: flex;
				width: 100%;

				@media screen and(max-width: $screen-sm) {
					display: block;
				}

				.form {
					width: 50%;
					padding: 5px;
					@media screen and(max-width: $screen-sm) {
						width: 100%;
					}

				}
				.config {
					width: 50%;
					min-height: 200px;
					padding: 5px;
					position: relative;

					@media screen and(max-width: $screen-sm) {
						width: 100%;
					}

					.btn-salvar {
						margin-top: 20px;
						background-color: $color-blue--base;
						color: white;
						font-weight: bold;
						width: 100px;
						position: absolute;
						bottom: 15px;
						right: 15px;

						&:hover {
							background-color: darken( $color-blue--base ,20);
						}
					}
				}
			}

			
		}
	}
</style>
