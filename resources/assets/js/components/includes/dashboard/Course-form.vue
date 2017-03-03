<template lang="html">
   	<div class="course-form">
		<div class="container course-form__content">
			<h4 class="title">Cadastro de curso</h4>
			<form v-on:submit.prevent>

				<div class="form-group">
					<label for="exampleInputEmail1">Matéria/Titulo</label>
					<input class="form-control" v-model="course.title">
				</div>

				<div class="form-group">
					<label for="exampleInputEmail1">Descrição</label>
					<textarea 
						id="form-description" 
						v-model="course.description"
						class="tiny-text-area">
					</textarea>
				</div>

				<div class="form-group form-group-image well">
					<label for="exampleInputEmail1">Capa do curso</label>
					<input type="file" name="file" id="input" class="form-control">
				</div>

				<button class="btn btn-default btn-salvar" @click="storeCourse">Salvar</button>
				<loader></loader>
			</form>
		</div>
	</div>
</template>
<script>
	import axios from "axios"
	import growl from "growl-alert"
	import moment from 'moment'
	import listClasses from '_common/components/ListClasses.vue'
	import Loader from '_common/components/Loader.vue'
	import courseService from '_service/course'

    export default {
		components: {
			listClasses,
			Loader
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
			validateForm () {
				this.course.description = tinymce.get('form-description').getContent()
				if(this.course.title.length < 5) {
					growl.warning('O titulo deve conter no minimo 5 caracteres')
				} else {
					if(this.course.description.length < 10) {
						growl.warning('A descrição deve conter no minimo 10 caracteres') 
					} else {
						return true
					}
				}
			},
			clearForm() {
				this.course.title = ''
				tinymce.activeEditor.setContent('');
			},
			storeCourse () {
				if(this.validateForm()) {
					this.$store.dispatch('toggleLoader', true)
					courseService.store( this.course )
					.then(response => {
						if (response.data.status) {
							this.$store.dispatch('toggleLoader', false)
							growl.success('Salvo')
							this.clearForm()
						} else {
							this.$store.dispatch('toggleLoader', false)
							growl.error(response.data.data.message)
						}
					})
					.catch(error => {
						this.$store.dispatch('toggleLoader', false)
						growl.error('Desculpe, ocorreu um erro')
					})
				}
			}
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

		.course-form__content {
			margin: 20px auto;
			margin-left: 40px;

			.title {
				margin: 10px auto;
				margin-left: 40px;
			}

			form {
				max-width: 600px;
				margin: 40px;

				@media screen and(max-width: $screen-md) {
					margin: 20px;
				}

				.form-group-image {
					width: 50%;
					
					@media screen and(max-width: $screen-md) {
						width: 100%;
					}
				}

				.btn-salvar {
					margin-top: 20px;
					background-color: $color-blue--base;
					color: white;
					font-weight: bold;
					width: 100px;
					margin-left: calc(100% - 100px);

					&:hover {
						background-color: darken( $color-blue--base ,20);
					}
				}
			}

			
		}
	}
</style>
