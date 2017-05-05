<template lang="html">
	<div class="class">
		<i v-if="testForm" @click="toggleTestForm" class="fa fa-arrow-left back-class" aria-hidden="true"><span>Voltar</span></i>
		<label class="title" v-if="testForm">{{ classData.title }}</label>
		<test-form v-show="testForm"></test-form>
		<div v-show="!testForm" class="class-form">
			<div class="form-group">
				<label>Matéria/Titulo</label>
				<input v-show="edit" v-model="classData.title" class="form-control">
				<h4 v-show="!edit" class="content">{{ classData.title }}</h4>
			</div>

			<div class="form-group">
				<label>Url do vídeo</label>
				<input v-show="edit" class="form-control" v-model="classData.video">
				<h4 v-show="!edit" class="content">{{ classData.video }}</h4>
			</div>

			<div class="form-group">
				<label>Descrição</label>
				<div v-show="edit">
					<textarea
						id="form-class-description"
						class="tiny-text-area"
						v-model="classData.description">
					</textarea>
				</div>
				<p v-show="!edit" class="content" v-html="classData.description"></p>
			</div>

			<div class="form-group">
				<label>Conteúdo principal</label>
				<div v-show="edit">
					<textarea
						id="form-class-content"
						class="tiny-text-area"
						v-model="classData.content">
					</textarea>
				</div>
				<p v-show="!edit" class="content" v-html="classData.content"></p>
			</div>
 
			<div class="form-controller">
				<button @click="toggleTestForm" class="btn btn-default btn-salvar" >Prova</button>
				<button v-if="edit" class="btn btn-default btn-salvar" @click="update">Salvar</button>
				<button v-else class="btn btn-default btn-salvar" @click="toggleUpdate">Atualizar</button>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from "axios"
	import growl from "growl-alert"
	import classService from '_service/class'
	import validator from '_helpers/validator'
	import TestForm from '_components/includes/form/TestForm.vue'

	export default {
		computed: {
			user: function () {
				return this.$store.state.Session
			},
			classData: function() {
				return this.$store.state.Class.data
			},
			courseId: function() {
				return this.$store.state.Class.courseId
			}
		},
		data () {
			return {
				edit: false,
				testForm: false
			}
		},
		methods: {
			toggleUpdate(){
				this.edit = !this.edit
			},
			toggleTestForm(){
				this.testForm = !this.testForm
			},
			update() {
				this.$store.dispatch('toggleLoader', true)
				if(this.validate()) {
					let key = this.classData.key
					delete this.classData.key
					classService
					.update( this.user.uid, this.courseId, key, this.classData )
					.then(response => {
						if (response.data.status) {
							this.$store.dispatch('toggleLoader', false)
							growl.success('Salvo')
							this.toggleUpdate()
						} else {
							this.$store.dispatch('toggleLoader', false)
							growl.error(response.data.data.message)
						}
					})
					.catch(error => {
						this.$store.dispatch('toggleLoader', false)
						growl.error(error.data.message)
					})
					this.$store.dispatch('toggleLoader', false)
				}
			},
			validate() {
				this.classData.description = tinymce.get('form-class-description').getContent()
				this.classData.content = tinymce.get('form-class-content').getContent()

				if(
					validator.stringValidator( 'titulo', 5, this.classData.title) &&
					validator.stringValidator( 'descrição', 10, this.classData.description) &&
					validator.stringValidator( 'conteudo principal', 5, this.classData.content)
				) {
					return true
				} else {
					return false
				}
			}
		},
		components: {
			TestForm
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	.class {
		max-width: 700px;

		.title {
			font-size: 25px;
			margin-left: 10px;
		}

		.back-class {
			cursor: pointer;
			font-size: 20px;
			margin-left: 20px;
			margin-top: 20px;
		}

		.class-form {
			margin: 20px;

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
	}
</style>
