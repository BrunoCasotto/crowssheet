<template lang="html">
	<div class="menu">
		<div class="items">
			<div class="item item--hidden"><span class="fa fa-arrow-left">Esconder</span></div>
			<div class="item"><span class="fa fa-users">Turmas</span></div>
			<div class="item"><span class="fa fa-address-card">Alunos</span></div>
			<div class="item"><span class="fa fa-pencil-square-o">Aulas</span></div>
			<div class="item"><span class="fa fa-mortar-board">Cursos</span></div>
			<div class="item"><span class="fa fa-cog">Configurações</span></div>
			<div class="item"><span class="fa fa-user">Meu Perfil</span></div>
			<div class="item"><span class="fa fa-lock">Segurança</span></div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
			}
		}
	}
</script>

<style lang="sass">
	@import "~_config/_vars.scss";

	.menu {
		.items {
			width: 100%;

			.item {
				display: flex;
				height: 45px;
				border-bottom: solid 1px $color-grey--light;
				padding: 0 10px;
				cursor: pointer;

				&--hidden {
					span {
						margin-left: auto;
					}
				}

				span {
					line-height: 45px;

					&:before {
						margin-right: 5px;
						font-size: 1.3rem;
					}
				}
			}
		}
	}
</style>
