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
		height: calc(100vh - 180px);

		&__header {
			border-bottom: solid 1px $color-grey--light;
			height: 100px;
		}

		.dashboard__content {
			display: flex;
			padding: 0 50px;
			height: 100%;
			border-left: solid 0.5px $color-grey--light;
			
			.menu {
				flex: 1;
				border-left: solid 0.5px $color-grey--light;
				border-right: solid 0.5px $color-grey--light;
			}
			.content {
				flex: 4;
			}
		}

	}
</style>
