<template lang="html">
   	<div class="course-form">
		<div class="form-group">
			<label for="exampleInputEmail1">Matéria/Titulo: </label>
			<input v-show="edit" class="form-control" v-model="course.title">
			<h4 e-else class="content">{{ course.title }}</h4>
		</div>

		<div class="form-group">
			<label for="exampleInputEmail1">Descrição</label>
			<div v-show="true">
				<textarea 
					id="description" 
					v-model="course.description"
					class="tiny-text-area"
					rows="12">
				</textarea>
			</div>
			<p v-show="!edit" class="content" v-html="course.description"></p>
		</div>
		<div class="form-controller">
			<button class="btn btn-default btn-salvar" >Inserir Aula</button>
			<button v-if="edit" class="btn btn-default btn-salvar" @click="update">Salvar</button>
			<button v-else class="btn btn-default btn-salvar" @click="toggleUpdate">Atualizar</button>
		</div>
	</div>
</template>
<script>
	import axios from "axios"
	import growl from "growl-alert"
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
				},
				edit: false
			}
		},
		props: {
			courseId: {
				type: String,
				required: true
			}
		},
		mounted() {
			this.fetch()
		},
		methods: {
			toggleUpdate(){
				this.edit = !this.edit
			},
			update() {

			},
			fetch() {
				$("#description").val(this.user.uid);
				this.$store.dispatch('toggleLoader', true)
				courseService
				.getSingle( this.user.uid, this.courseId )
				.then(response => {
					if (response.data) {
						this.$store.dispatch('toggleLoader', false)
						this.course = response.data
					} else {
						this.$store.dispatch('toggleLoader', false)
						growl.error(response.data.data.message)
					}
				})
				.catch(error => {
					this.$store.dispatch('toggleLoader', false)
					growl.error(error.data.message)
				})
			},
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
