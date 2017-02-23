<template lang="html">
	<div class="menu" :class="{'menu--active' : isHidden }">
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
		</div>
	</div>
</template>

<script>
	export default {
		data: function() { 
			return {
				isHidden: false
			}
		},
		 computed: {
			itemActive: function () {
				return this.$store.state.Menu.active
			}
		},
		methods: {
			toggleMenu: function() {
				console.log('test')
				if(this.isHidden) {
					this.isHidden = false
				} else {
					this.isHidden = true
				}
			},
			change: function( active ) {
				this.$store.dispatch('updateMenu', active)
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

			.item {
				display: flex;
				height: 45px;
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
					span {
						margin-left: auto;
						@media screen and(max-width: $screen-md) {
							margin: 0;
						}
					}
				}

				&:hover {
					background-color: $color-blue--light;
				}

				span {
					line-height: 45px;
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
	@media screen and(max-width: $screen-md) {
		&--active {
			left: 0;
			top: 100px;

			@media screen and(max-width: $screen-sm) {
				width: 100%;
			}

			.items {
				width: 250px;

				@media screen and(max-width: $screen-sm) {
					z-index: 1;
				}

				@media screen and(max-width: $screen-xs) {
					position: absolute;
					width: 100%;
				}
				
				.item {
					span {
						display: flex;
					}

					i {
						display: none;
					}
				}
			}
		}
	}

	@media screen and(min-width: $screen-md) {
		&--active {
			.items {
				width: 45px;
				
				.item {
					span {
						display: none;
					}

					i {
						display: block;
					}
				}
			}
		}
	}
		
	}
</style>
