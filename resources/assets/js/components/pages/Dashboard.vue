<template lang="html">
   	<div class="dashboard">
		<div class="dashboard__header">
		</div>
		<div class="dashboard__content">
			<div class="menu">
				<side-menu></side-menu>
			</div>
			<div class="content">
			</div>
		</div>
	</div>
</template>
<script>
    import VHeader from "_components/includes/Header.vue"
	import VFooter from "_components/includes/Footer.vue"
	import SideMenu from "_common/components/Menu.vue"

    export default {
        name: 'Dashboard',
        components: {
            VHeader,
            VFooter,
			SideMenu
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
			}
		}

	}
</style>
