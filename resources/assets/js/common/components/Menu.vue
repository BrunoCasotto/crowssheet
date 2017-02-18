<template lang="html">
	<div class="menu" :class="{'menu--active' : isHidden }">
		<div class="items">
			<div v-on:click="toggleMenu" class="item item--hidden">
				<i class="fa fa-arrow-right"></i>
				<span class="fa fa-arrow-left">Esconder</span>
			</div>
			<div class="item">
				<i class="fa fa-users"></i>
				<span class="fa fa-users">Turmas</span>
			</div>
			<div class="item">
				<i class="fa fa-address-card"></i>
				<span class="fa fa-address-card">Alunos</span>
			</div>
			<div class="item">
				<i class="fa fa-pencil-square-o"></i>
				<span class="fa fa-pencil-square-o">Aulas</span>
			</div>
			<div class="item">
				<i class="fa fa-mortar-board"></i>
				<span class="fa fa-mortar-board">Cursos</span>
			</div>
			<div class="item">
				<i class="fa fa-cog"></i>
				<span class="fa fa-cog">Configurações</span>
			</div>
			<div class="item">
				<i class="fa fa-user"></i>
				<span class="fa fa-user">Meu Perfil</span>
			</div>
			<div class="item">
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
		methods: {
			toggleMenu: function() {
				console.log('test')
				if(this.isHidden) {
					this.isHidden = false
				} else {
					this.isHidden = true
				}
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

				&--hidden {
					span {
						margin-left: auto;
						@media screen and(max-width: $screen-md) {
							margin: 0;
						}
					}
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
			position: absolute;
			width: 30%;
			left: 0;
			top: 100px;

			@media screen and(max-width: $screen-sm) {
				width: 100%;
			}

			.items {
				width: 100%;
				
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
