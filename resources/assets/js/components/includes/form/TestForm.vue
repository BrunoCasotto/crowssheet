<template lang="html">
	<form v-on:submit.prevent>
		<h4 class="title">Cadastro de Prova</h4>

		<template v-for="( question, index ) in test.questions">
			<div class="well question">
				<label>Descrição</label>
				<textarea
					class="form-control" 
					v-model="question.description"
					Columns="50"
					Rows="5"
				></textarea>
			<div class="question__option-label">
				<label class="option">Opção</label>
				<label class="correct">Correta</label>
			</div>
			<div class="question__option">
				<label class="correct">1</label>
				<input class="form-control option" v-model="question.opt1">
				<input 
					type="radio" 
					class="correct" 
					value="opt1"
					:name="'opt'+index"
					v-model="question.correct"
				>
			</div>

			<div class="question__option">
				<label class="correct">2</label>
				<input class="form-control option" v-model="question.opt2">
				<input 
					type="radio" 
					class="correct" 
					value="opt2"
					:name="'opt'+index"
					v-model="question.correct"
				>
			</div>

			<div class="question__option">
				<label class="correct">3</label>
				<input class="form-control option" v-model="question.opt3">
				<input 
					type="radio" 
					class="correct" 
					value="opt3"
					:name="'opt'+index"
					v-model="question.correct"
				>
			</div>

			<div class="question__option">
				<label class="correct">4</label>
				<input class="form-control option" v-model="question.opt4">
				<input 
					type="radio" 
					class="correct"
					value="opt3"
					:name="'opt'+index"
					v-model="question.correct"
				>
			</div>

			</div>
		</template>

		<div class="form-controller">
			<button @click="save" class="btn btn-default btn-salvar">Salvar</button>
		</div>
	</form>
</template>
<script>
	import growl from "growl-alert"
	import validator from '_helpers/validator'

	export default {
		data() {
			return {
				test: {
					questions: [
						{
							description: "",
							opt1: "",
							opt2: "",
							opt3: "",
							opt4: "",
							correct: ""
						},
						{
							description: "",
							opt1: "",
							opt2: "",
							opt3: "",
							opt4: "",
							correct: ""
						}
					]
				}
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
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

		.question {

			&__option-label {
				margin-top: 10px;
				display: flex;
				justify-content: space-between;
			}

			&__option {
				display: flex;

				.option {
					margin: 0 10px;
				}

				.correct {
					margin: 10px;
    				width: 15px;
				}
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
