<template lang="html">
	<div class="course">
		<button v-if="edit" @click="toggleUpdate" class="fa fa-arrow-left btn btn-black" >Voltar</button>

		<h4 v-if="classForm" class="title">{{ course.title }}</h4>
		<class-form v-show="classForm"></class-form>
		<div v-show="!classForm" class="course-form">
			<div class="form-group">
				<label class="title">Matéria/Título: </label>
				<input v-show="edit" class="form-control" v-model="course.title">
				<h4 v-show="!edit" class="content">{{ course.title }}</h4>
			</div>

			<div class="form-group">
				<label class="title">Descrição</label>
				<div v-show="edit">
					<textarea 
						id="form-description" 
						v-model="course.description"
						class="tiny-text-area"
						rows="12">
					</textarea>
				</div>
				<p v-show="!edit" class="content" v-html="course.description"></p>
			</div>
			<div class="form-controller">
				<button  @click="toggleClassForm" class="btn btn-default btn-black" >Inserir Aula</button>
				<button v-if="edit" class="btn btn-default btn-orange" @click="update">Salvar</button>
				<button v-else class="btn btn-default btn-green" @click="toggleUpdate">Atualizar</button>
			</div>
		</div>
		<class-list v-if="!classForm" :classes="classList"></class-list>
	</div>
</template>
<script>
	import axios from "axios"
	import growl from "growl-alert"
	import courseService from '_service/course'
	import ClassForm from '_components/includes/form/ClassForm.vue'
	import ClassList from '_components/includes/list/ClassList.vue'

	export default {
		computed: {
			user: function () {
				return this.$store.state.Session
			},
			course: function() {
				return this.$store.state.Course
			}
		},
		data () {
			return {
				edit: false,
				classForm: false,
				classList: []
			}
		},
		mounted() {
			this.filterClassList()
		},
		components: {
			ClassForm,
			ClassList
		},
		methods: {
			toggleUpdate(){
				this.edit = !this.edit
			},
			toggleClassForm(){
				this.classForm = !this.classForm
			},
			filterClassList() {
				for(var key in this.course.classes) {
					this.course.classes[key]['key'] = key
					this.classList.push(this.course.classes[key])
				}
			},
			update() {
				this.$store.dispatch('toggleLoader', true)
				if(this.validateForm()) {
					courseService
					.update( this.user.uid, this.course, this.course.key )
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
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	@import "~_config/_commons.scss";

	.course {
		max-width: 700px;

		.title {
			font-size: 25px;
			margin-left: 10px;
		}

		.course-form {
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
