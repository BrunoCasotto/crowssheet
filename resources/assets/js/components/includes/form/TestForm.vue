<template lang="html">
	<form v-on:submit.prevent>
		<h4 class="title">Cadastro de Prova</h4>

		<template v-for="( question, index ) in test.questions">
			<div class="well question">
				<i @click="deleteQuestion(index)" class="fa fa-trash remove-button"></i>
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
					value="opt4"
					:name="'opt'+index"
					v-model="question.correct"
				>
			</div>

			</div>
		</template>

		<div class="form-controller">
			<button v-if="isUpdate" @click="update" class="btn btn-default btn-salvar">Atualizar</button>
			<button v-else @click="save" class="btn btn-default btn-salvar">Salvar</button>
			<button @click="incrementQuestion" class="btn btn-default btn-increment">+ Questão</button>
		</div>
	</form>
</template>
<script>
	import growl from "growl-alert"
	import validator from '_helpers/validator'
	import testService from '_service/test'

	export default {
		data() {
			return {
				test: {
					questions: []
				},
				isUpdate: false
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			},
			classData: function() {
				return this.$store.state.Class
			}
		},
		mounted() {
			this.verifyTestExists()
		},
		methods: {
			save() {
				if(this.validate()) {
					this.$store.dispatch('toggleLoader', true)
					testService
					.store( this.user.uid, this.classData.courseId, this.classData.data.key, this.test )
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
			},
			update() {
				if(this.validate()) {
					this.$store.dispatch('toggleLoader', true)
					testService
					.update( this.user.uid, this.classData.courseId, this.classData.data.key, this.test )
					.then(response => {
						if (response.data.status) {
							this.$store.dispatch('toggleLoader', false)
							growl.success('Atualizado')
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
			},
			verifyTestExists() {
				if(this.classData.data.test) {
					this.test = this.classData.data.test
					this.test.questions = JSON.parse(this.classData.data.test.questions)
					this.isUpdate = true
				}
			},
			incrementQuestion() {
				this.test.questions.push({
					description: "",
					opt1: "",
					opt2: "",
					opt3: "",
					opt4: "",
					correct: ""
				})
			},
			deleteQuestion( index ) {
				this.test.questions.splice( index, 1)
			},
			validate() {
				let errors = 0

				if( this.test.questions.length > 0 ) {
					this.test.questions.forEach( ( question, index )=> {
						if(!validator.stringValidatorMessage(
							`A descrição do exercício ${index+1} deve conter no mínimo 10 caracteres.`,
							5, question.description
						) ||
						!validator.stringValidatorMessage(
							`A questão 1 do exercício ${index+1} deve conter no mínimo 5 caracteres.`,
							5, question.opt1
						) ||
						!validator.stringValidatorMessage(
							`A questão 2 do exercício ${index+1} deve conter no mínimo 5 caracteres.`,
							5, question.opt2
						) ||
						!validator.stringValidatorMessage(
							`A questão 3 do exercício ${index+1} deve conter no mínimo 5 caracteres.`,
							5, question.opt3
						) ||
						!validator.stringValidatorMessage(
							`A questão 4 do exercício ${index+1} deve conter no mínimo 5 caracteres.`,
							5, question.opt4
						) ||
						!validator.stringValidatorMessage(
							`A resposta deve ser selecionada no exercício ${index+1}.`,
							1, question.correct
						)) {
							errors++
						}
					})
				} else {
					growl.warning('Para concluir insira ao menos uma questão.')
				}

				if(errors === 0) {
					return true
				} else {
					return false
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
			position: relative;
			background-image: linear-gradient(to bottom, white, $orange-base);

			.remove-button {
				position: absolute;
				right: 10px;
				top: 10px;
				cursor: pointer;
				font-size: 20px;
			}

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
				margin-right: 10px; 

				&:hover {
					background-color: darken( $orange-base ,20);
				}
			}

			.btn-increment {
				background-color: $red-base;

				&:hover {
					background-color: darken( $red-base ,20);
				}
			}
		}

	}


</style>
