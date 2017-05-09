<template lang="html">
   	<div class="course-form">
		<div class="form-group">
			<label for="exampleInputEmail1">Matéria/Titulo</label>
			<input class="form-control" v-model="course.title">
		</div>

		<div class="form-group">
			<label for="exampleInputEmail1">Descrição</label>
			<textarea 
				id="form-description" 
				v-model="course.description"
				class="tiny-text-area"
				rows="12">
			</textarea>
		</div>
		<div class="form-controller">
			<button v-if="update" class="btn btn-default btn-salvar" @click="inserirAula">Inserir Aula</button>
			<button v-if="update" class="btn btn-default btn-salvar" @click="atualizar">Atualizar</button>
			<button v-else class="btn btn-default btn-salvar" @click="storeCourse">Salvar</button>
		</div>
	</div>
</template>
<script>
	import axios from "axios"
	import growl from "growl-alert"
	import moment from 'moment'
	import courseService from '_service/course'

    export default {
		computed: {
			courseUpdate: function () {
				return this.$store.state.Modal.data
			},
			user: function () {
				return this.$store.state.Session
			}
		},
		data () {
			return {
				course: {
					title: '',
					description: '', 
					image:"https://firebasestorage.googleapis.com/v0/b/crows-755fd.appspot.com/o/images-default%2Fcourse-default.png?alt=media&token=0ce5c765-b502-4ff6-9425-58c4bf4ae160"
				}
			}
		},
		props: {
			update: {
				type: Boolean,
				default: false
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
					courseService.store( this.user.uid, this.course )
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
						growl.error(error.data.message)
					})
				}
			},
			addClass() {
				this.$store.dispatch('toggleModal', {
					type: 'class-form',
					active: true,
					data: {
						courseId: this.courseUpdate.key
					}
				})
			}
		}
    }
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	
	.course-form {
		margin: 20px;
		max-width: 700px;  

		.btn {
			color: white;
			font-weight: bold;
			margin-top: 20px;
			width: 100px;
		}
	
		.btn-salvar {
			background-color: $red-base;

			&:hover {
				background-color: darken( $red-base ,20);
			}
		}

		.btn-adicionar {
			background-color: $black-base;

			&:hover {
				background-color: darken( $black-base ,20);
			}
		}
	}
</style>
