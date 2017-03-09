<template lang="html">
	<div class="menu" :class="{'menu--active' : isActive }">
		<div class="items">
			<div v-on:click="toggleMenu" class="item item--hidden">
				<i class="fa fa-arrow-right"></i>
				<span class="fa fa-arrow-left">Esconder</span>
			</div>
			<div class="item" v-on:click="change('home')" :class="{'item--active' : itemActive == 'home' }">
				<i class="fa fa-home"></i>
				<span class="fa fa-home">Inicio</span>
			</div>
			<div class="item" v-on:click="change('users')" :class="{'item--active' : itemActive == 'users' }">
				<i class="fa fa-users"></i>
				<span class="fa fa-users">Turmas</span>
			</div>
			<div class="item" v-on:click="change('students')" :class="{'item--active' : itemActive == 'students' }">
				<i class="fa fa-address-card"></i>
				<span class="fa fa-address-card">Alunos</span>
			</div>
			<div class="item" v-on:click="change('classes')" :class="{'item--active' : itemActive == 'classes' }">
				<i class="fa fa-pencil-square-o"></i>
				<span class="fa fa-pencil-square-o">Aulas</span>
			</div>
			<div class="item" v-on:click="change('courses')" :class="{'item--active' : itemActive == 'courses' }">
				<i class="fa fa-mortar-board"></i>
				<span class="fa fa-mortar-board">Cursos</span>
			</div>
			<div class="item" v-on:click="change('create')" :class="{'item--active' : itemActive == 'create' }">
				<i class="fa fa-plus"></i>
				<span class="fa fa-mortar-board">Criar curso</span>
			</div>
			<div class="item" v-on:click="change('tools')" :class="{'item--active' : itemActive == 'tools' }">
				<i class="fa fa-cog"></i>
				<span class="fa fa-cog">Configurações</span>
			</div>
			<div class="item" v-on:click="change('profile')" :class="{'item--active' : itemActive == 'profile' }">
				<i class="fa fa-user"></i>
				<span class="fa fa-user">Meu Perfil</span>
			</div>
			<div class="item" v-on:click="change('security')" :class="{'item--active' : itemActive == 'security' }">
				<i class="fa fa-lock"></i>
				<span class="fa fa-lock">Segurança</span>
			</div>
			<div class="item" v-on:click="logout">
				<i class="fa fa-power-off"></i> 
				<span class="fa fa-power-off">Sair</span>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	import growl from "growl-alert"

	export default {
		data: function() { 
			return {
				isActive: false
			}
		},
		 computed: {
			itemActive: function () {
				return this.$store.state.Menu.active
			}
		},
		methods: {
			toggleMenu: function() {
				if(this.isActive) {
					this.isActive = false
				} else {
					this.isActive = true
				}
			},
			change: function( active ) {
				this.$store.dispatch('updateMenu', active)
			},
			logout: ()=> {
				axios.post('/auth/singout')
				.then(response => {
					console.log(response)
				})
				.catch(error => {
					growl.error('Desculpe, ocorreu um erro')
				})
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";

	.menu {
		.items {
			width: 100%;
			transition: .5s all ease;
			width: 250px;

			@media screen and(max-width: $screen-md) {
				width: 45px;
			}

			@media screen and(max-width: $screen-sm) {
				z-index: 5;
			}

			.item {
				display: flex;
				height: 60px;
				border-bottom: solid 1px $color-grey--light;
				border-left: solid 0.5px $color-grey--light;
				border-right: solid 0.5px $color-grey--light;
				padding: 0 10px;
				cursor: pointer;
				overflow: hidden;
				z-index: 1;
				background-color: white;

				&--active {
					background-color: $color-medium-grey--base;
				}

				&--hidden {
					display: none;
				}

				&:hover {
					background-color: $color-blue--light;
				}

				span {
					line-height: 60px;
					transition: .5s all ease;
					@media screen and(max-width: $screen-md) {
						display: none;
					}

					&:before {
						margin-right: 5px;
						font-size: 1.3rem;
					}
				}

				i {
					line-height: 45px;
					display: none;
					transition: .5s all ease;
					@media screen and(max-width: $screen-md) {
						display: block;
					}

					&:before {
						margin-right: 5px;
						font-size: 1.3rem;
					}
				}
			}
		}	
	}
</style>
