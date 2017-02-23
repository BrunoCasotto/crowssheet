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
				
				<home></home>
			</div>
		</div>
	</div>
</template>
<script>
	import SideMenu from "_common/components/Menu.vue"
	import TextBlock from "_common/components/Text-block.vue"
	import Logo from "_common/components/Logo.vue"
	import Home from "_components/includes/dashboard/Home.vue"

    export default {
        name: 'Dashboard',
        components: {
			SideMenu,
			Logo,
			TextBlock,
			Home
        },
		data () {
			return{
				active: 'post-form'
			}
		},
		mounted () {
			
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
			.content {
				flex: 4;
				border-right: solid 0.5px $color-grey--light;
				@media screen and(max-width: $screen-md) {
					border-right: none;
				}

				
			}
		}

	}
</style>
