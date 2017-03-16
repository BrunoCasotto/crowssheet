<template lang="html">
   	<div class="course-form">
		<div :class="['container course-form__content', modifier]">
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
				<div class="form-controller">
					<button class="btn btn-default btn-adicionar" @click="storeCourse">+ Aula</button>
					<button class="btn btn-default btn-salvar" @click="storeCourse">Salvar</button>
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
	import courseService from '_service/course'

    export default {
		props: {
			courseUpdate: {
				type: Object,
				default: null
			},
			modifier: {
				type: String,
				default: ''
			}
		},
		components: {
			listClasses,
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
		}
    }
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	
	.course-form {
		width: 100%;

		.course-form__content {
			margin: 20px auto;
			margin-left: 20px;

			.title {
				margin: 10px auto;
				margin-left: 40px;
			}

			form {
				max-width: 600px;
				margin: 40px;
				position: relative;

				@media screen and(max-width: $screen-md) {
					margin: 20px;
				}

				.form-group-image {
					width: 50%;
					
					@media screen and(max-width: $screen-md) {
						width: 100%;
					}
				}

				.form-controller {
					display: flex;
					width: 100%;

					.btn {
						color: white;
						font-weight: bold;
						margin-top: 20px;
						width: 100px;
					}
				
					.btn-salvar {
						background-color: $color-blue--base;

						&:hover {
							background-color: darken( $color-blue--base ,20);
						}
					}
					.btn-adicionar {
						display: none;
						background-color: $color-green--base;

						&:hover {
							background-color: darken( $color-green--base ,20);
						}
					}
				}

			}
		}

		//modifier
		.update {
			margin: 0 auto;
			margin-left: 0px;
			form {
				.form-controller {
					.btn-adicionar {
						display: block	
					}
				}
			}
		}
	}
</style>
