<template lang="html">
   	<div class="dashboard">
		<!-- information -->
		<div class="dashboard-home">
		<div class="well content__info">
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
			</div>
		</div>
		<!-- end information -->
		</div>
	</div>
</template>
<script>
	import TextBlock from "_common/components/Text-block.vue"
	import Logo from "_common/components/Logo.vue"
	import Loader from '_common/components/Loader.vue'

	export default {
		name: 'Dashboard',
		components: {
			TextBlock
		}
    }
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	.dashboard {
		padding-top: 20px;

		.content__info {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			align-content: center;
			width: 97%;
			margin: 0 auto;
			
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
		
		.dashboard-home {
			width: 100%;
			height: 400px;
			margin: 0 auto;
		}
	}
</style>
