<template lang="html">
   	<div class="dashboard">
		<div class="dashboard__header">
		</div>
	</div>
</template>
<script>
    import VHeader from "_components/includes/Header.vue"
	import VFooter from "_components/includes/Footer.vue"
	
    export default {
        name: 'Dashboard',
        components: {
            VHeader,
            VFooter
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
		&__header {
			border-bottom: solid 1px $color-grey--light;
			height: 100px;
		}
	}
</style>
