<template lang="html">
   	<div class="dashboard">
		<div class="dashboard__header">
			<div class="header__logo">
				<logo width="100px" height="100px"></logo>
			</div>
		</div>
		<div class="dashboard__content">
			<div class="menu">
				<side-menu></side-menu>
			</div>
			<div class="content">
				<div class="content__info">
					<div class="block">
						<text-block 
						appearance="block--sm"
						color= "#828c94"
						:title="'Visualizações'"
						:text="'100'"
						></text-block>
					</div>
					<div class="block">
						<text-block 
						appearance="block--sm"
						color= "#ff5c46"
						:title="'Total Alunos'"
						:text="'60'"
						></text-block>
					</div>
					<div class="block">
						<text-block 
						appearance="block--sm"
						color= "#2c9fc8"
						:title="'Média turma'"
						:text="'6.0'"
						></text-block>
				</div>	</div>
			</div>
		</div>
	</div>
</template>
<script>
    import VHeader from "_components/includes/Header.vue"
	import VFooter from "_components/includes/Footer.vue"
	import SideMenu from "_common/components/Menu.vue"
	import TextBlock from "_common/components/Text-block.vue"
	import Logo from "_common/components/Logo.vue"

    export default {
        name: 'Dashboard',
        components: {
            VHeader,
            VFooter,
			SideMenu,
			Logo,
			TextBlock
        },
		data () {
			return{
				active: 'post-form'
			}
		}
    }
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	
	.dashboard {
		height: 100%;

		&__header {
			border-bottom: solid 1px $color-grey--light;
			height: 100px;
			display: flex;

			.header__logo {
				position: relative;
				left: 5px;
				top: 5px;
				height: 100%;
			}
		}

		.dashboard__content {
			display: flex;
			padding: 0 50px;
			height: 100%;
			@media screen and(max-width: $screen-md) {
				padding: 0;
			}
			.menu {
				flex: 1;
				@media screen and(max-width: $screen-md) {
					flex: initial;
				}
			}
			.content {
				flex: 4;
				border-right: solid 0.5px $color-grey--light;
				@media screen and(max-width: $screen-md) {
					border-right: none;
				}

				.content__info {
					display: flex;
					flex-wrap: wrap;
					position: relative;
					justify-content: space-around;
					align-content: center;
					width: 100%;
					top: -50px;
					
					.block {
						margin: 5px;
						display: flex;
    					justify-content: center;
					}

					@media screen and(max-width: $screen-md) {
						top: 0px;
					}

					@media screen and(max-width: $screen-xs) {
						display: block;
					}

				}
			}
		}

	}
</style>
