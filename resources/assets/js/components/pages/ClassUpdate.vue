<template lang="html">
	<div class="class">
		<button v-if="testForm" @click="toggleTestForm" class="fa fa-arrow-left btn btn-black" >Voltar</button>
		<button v-if="edit" @click="toggleUpdate" class="fa fa-arrow-left btn btn-black" >Voltar</button>

		<label class="title" v-if="testForm">{{ classData.title }}</label>
		<test-form v-show="testForm"></test-form>
		<div v-show="!testForm" class="class-form">
			<div class="form-group">
				<label class="title">Matéria/Titulo</label>
				<input v-show="edit" v-model="classData.title" class="form-control">
				<h4 v-show="!edit" class="content">{{ classData.title }}</h4>
			</div>

			<div class="form-group">
				<label class="title">Url do vídeo</label>
				<input v-show="edit" class="form-control" v-model="classData.video">
				<h4 v-show="!edit" class="content">{{ classData.video }}</h4>

				<youtube v-if="classData.video.length > 0" :video-id="classData.video"></youtube>
				<p v-else>Nenhuma video aula cadastrada</p>
			</div>

			<div class="form-group">
				<label class="title">Descrição</label>
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
				<label class="title">Conteúdo principal</label>
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
				<button v-if="!testForm" @click="toggleTestForm" class="btn btn-default btn-black" >Atualizar/inserir Prova</button>
				<button v-if="edit" class="btn btn-default btn-green" @click="update">Salvar</button>
				<button v-else class="btn btn-default btn-orange" @click="toggleUpdate">Atualizar</button>
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
	@import "~_config/_commons.scss";
	.class {
		max-width: 700px;

		.title {
			font-size: 20px;
			margin-left: 10px;
		}

		.back {
			cursor: pointer;
			font-size: 20px;
			margin-left: 20px;
			margin-top: 20px;
			&:hover {
				color: lighten( $black-base ,20);
			}

			span {
				font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
				font-weight: bold;
			}
		}

		.class-form {
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
	}
</style>
