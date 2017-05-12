<template lang="html">
	<form v-on:submit.prevent>
		<h4 class="title">Cadastro de Aula</h4>
		<div class="form-group">
			<label>Matéria/Titulo</label>
			<input v-model="classData.title" class="form-control">
		</div>

		<div class="form-group">
			<label>Url do vídeo</label>
			<input class="form-control" v-model="classData.video">
		</div>

		<div class="form-group">
			<label>Descrição</label>
			<textarea
				id="form-class-description"
				class="tiny-text-area"
				v-model="classData.description">
			</textarea>
		</div>

		<div class="form-group">
			<label>Conteúdo principal</label>
			<textarea
				id="form-class-content"
				class="tiny-text-area"
				v-model="classData.content">
			</textarea>
		</div>

		<div class="form-group well">
			<label for="exampleInputEmail1">Arquivos para download</label>
			<input type="file" name="file" id="input-data" class="form-control">
		</div>

		<div class="form-controller">
			<button @click="save" class="btn btn-default btn-salvar">Salvar</button>
		</div>
	</form>
</template>
<script>
	import growl from "growl-alert"
	import classService from '_service/class'
	import validator from '_helpers/validator'

	export default {
		data: ()=> {
			return {
				classData: {
					title:"",
					description: "",
					content: "",
					image: "https://braziljs.org/blog/content/images/2016/04/1436439824nodejs-logo-1.png",
					video: "",
					file: "http://fisica.ufpr.br/kurumin/kurumin-light-7.0.iso"
				}
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
		methods: {
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
			},
			save() {
				if(this.validate()) {
					this.$store.dispatch('toggleLoader', true)
					classService.store( this.user.uid, this.course.key, this.classData)
					.then(response => {
						if (response.data.status) {
							this.$store.dispatch('toggleLoader', false)
							growl.success('Salvo')
							location.reload()
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
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";

	form {
		max-width: 600px;
		margin: 40px;
		position: relative;

		@media screen and(max-width: $screen-md) {
			margin: 20px;
		}

		.title {
			margin: 10px auto;
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
				background-color: $orange-base;

				&:hover {
					background-color: darken( $orange-base ,20);
				}
			}
		}

	}


</style>
