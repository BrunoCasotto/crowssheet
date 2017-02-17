<template lang="html">
   	<div class="post-form">
		<div class="container post-form__content">
			<form class="form" v-on:submit.prevent>
  				<div class="form-group">
					<label for="exampleInputEmail1">Titulo</label>
					<input class="form-control" v-model="post.title">
				</div>
				<div class="form-group">
					<label for="exampleInputEmail1">Subtitulo</label>
					<input class="form-control" v-model="post.subtitle">
				</div>
				<div class="form-group">
					<label for="exampleInputEmail1">Descrição curta</label>
					<textarea class="form-control" rows="3" v-model="post.previous"></textarea>
				</div>
				<div class="form-group">
					<label for="exampleInputEmail1">Conteudo Principal</label>
					<textarea 
						id="tiny-text-area" 
						class="form-control"
						v-model="post.text"
					></textarea>
					<button class="btn btn-default" v-on:click="getPreviousMain">Ver prévia</button>
				</div>
				<div class="well input-file" v-html="post.text"></div>
				<div class="input-group date" data-provide="datepicker">
					<input type="text" class="form-control" v-model="post.date">
					<div class="input-group-addon">
						<span class="glyphicon glyphicon-th"></span>
					</div>
				</div>
			</form>
			<div class="config">
				<input-file 
					title="imagem previa"
					:image-name="imageName"
					image-locale="previous"	
				></input-file>
				<div class="form-group">
					<label for="exampleInputEmail1">Categoria</label>
					<select class="form-control" v-model="post.category" v-if="categories.length > 0">
						<!--<option v-for="(cat, key) in categories" :value="cat.key" :selected="key === 0">-->
						<option v-for="(cat, key) in categories" :value="cat.key">
							{{index, cat.name}}
						</option>
					</select>
					<select class="form-control" v-else>
						<option>Nenhuma categoria</option>
					</select>

				</div>
				<label for="exampleInputEmail1">Status</label>
				<select class="form-control" v-model="post.status">
					<option value="hidden">Oculto</option>
					<option value="visible">Visível</op tion>
				</select>

				<label for="exampleInputEmail1">Tamanho</label>
				<select class="form-control" v-model="post.appearance">
					<option value="big">Grande</option>
					<option value="small" >Pequeno</option>
				</select>
				<button class="btn btn-default btn__save" v-on:click="storePost">Salvar</button>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from "axios"
	import growl from "growl-alert"
	import InputFile from '_service/files/InputFile.vue'
	import moment from 'moment'

    export default {
        name: 'PostForm',
        components: {
			InputFile
        },
		data () {
			return {
				post: {
					title: '',
					text: '',
					previous: '',
					category: '',
					status: 'hidden',
					image: '',
					subtitle:'',
					date: '',
					appearance: 'big'
				},
				categories: [],
				image: {
					previous: ''
				},
				imageName: moment().format('X')
			}
		},
		mounted () {
			this.post.date = moment().format('DD-MM-YYYY')
			this.fetchData()
		},
		methods: {
			storePost () {
				axios.post('/post/save', {
					post: this.post
				})
				.then(response => {
					if (response.data) {
						this.post.title = ""
						this.post.text = ""
						growl.success('Postado')
					}
				})
				.catch(error => {
					growl.error('Ocorreu um erro')
				})
			},
			fetchData () {
				axios.get('/json/post/all/category')
					.then(response => {
						this.categories = response.data
					})
					.catch(error => {})
			},
			getPreviousMain () {
				this.post.text = tinymce.get('tiny-text-area').getContent()
			}
		},
		events: {
			'picture-url': function(msg) {
				this.post.image = msg
			}
		}
    }
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	
	.post-form {
		.btn__save{
			margin-top: 20px;
		}

		&__content {
			max-width: 1000px;
			margin: 20px auto;
			@media screen and(min-width: $screen-sm) {
				display: flex;
			}

			.form {
				width: 50%;
				padding: 5px;
				@media screen and(max-width: $screen-sm) {
					width: 100%;
				}
			}
			.config {
				width: 50%;
				padding: 5px;
				@media screen and(max-width: $screen-sm) {
					width: 100%;
				}
			}
		}
	}
</style>
