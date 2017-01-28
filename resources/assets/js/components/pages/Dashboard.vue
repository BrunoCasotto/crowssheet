<template lang="html">
   	<div class="dashboard">
		<div class="dashboard__header">
			<div class="header__top">

			</div>
			<div class="header__nav">
				<div class="container header__nav__content">
					<div class="items">
						<a class="item" href="#">Posts</a>
						<a class="item" href="#">Personalizar</a>
						<a class="item" href="#">Usuarios</a>
						<a class="item" href="#">Configurações</a>
					</div>
				</div>	
			</div>
		</div>
		<div class="container dashboard__content">
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
					<textarea class="form-control" rows="10" v-model="post.text"></textarea>
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
						<option v-for="(key, cat) in categories" :value="cat.key" :selected="key === 0">
							{{index, cat.name}}
						</option>
					</select>
					<select class="form-control" v-else>
						<option>Nenhuma categoria</option>
					</select>

				</div>
				<label for="exampleInputEmail1">Status</label>
				<select class="form-control" v-model="post.status">
					<option value="hidden" selected>Oculto</option>
					<option value="visible">Visível</op tion>
				</select>

				<label for="exampleInputEmail1">Tamanho</label>
				<select class="form-control" v-model="post.appearance">
					<option value="big" selected>Grande</option>
					<option value="small" >Pequeno</option>
				</select>
				<button class="btn btn-default btn__save" v-on:click="storePost">Salvar</button>
			</div>
		</div>
		<div class="dashboard__footer">

		</div>

	</div>
</template>
<script>
    import VHeader from "_components/includes/Header.vue"
	import VFooter from "_components/includes/Footer.vue"
	import axios from "axios"
	import growl from "growl-alert"
	import InputFile from '_service/files/InputFile.vue'
	import moment from 'moment'
	
    export default {
        name: 'dashboard',
        components: {
            VHeader,
            VFooter,
			InputFile
        },
		data: function() {
			return{
				post: {
					title: '',
					text: '',
					previous: '',
					category: '',
					status: '',
					image: '',
					subtitle:''
				},
				categories: [],
				image: {
					previous: ''
				},
				imageName: JSON.parse(JSON.stringify(moment()))
			}
		},
		ready: function() {
			this.fetchData()
		},
		methods: {
			storePost: function() {
				axios.post('/post/save', {
					post: this.post
				})
				.then((response)=> {
					if(response.data.status) {
						this.post.title = ""
						this.post.text = ""
						growl.success('Postado')
					}
				})
				.catch((error)=> {
					growl.error('Ocorreu um erro')
				})
			},
			fetchData: function() {
				axios.get('/json/post/all/category')
				.then((response)=> {
					this.categories = response.data
				})
				.catch((error)=> {})
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
	
	.dashboard {
		.btn__save{
			margin-top: 20px;
		}

		&__header {
			background-color: $color-grey--light;
			.header__top{
				height: 100px;
				width: 100%;
			}
			.header__nav {
				background-color: $color-light-grey--base;
				&__content {
					.items {
						display: flex;
						align-items: center;

						.item {
							margin: 0 5px 0 5px;
							display: flex;
							padding: 5px;
							font-size: 1.4rem;
							color: black;
							text-decoration: none;

							&:hover {
							color: $color-grey-blue-light;
							}
						}
					}
					
				}
			}
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

		&__footer {

		}
	}
</style>
