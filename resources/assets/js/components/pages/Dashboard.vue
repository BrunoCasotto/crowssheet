<template lang="html">
   	<div class="dashboard">
		<!-- information -->
		<div class="dashboard-home">
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
			</div>
		</div>
		<!-- end information -->

		<!--User level-->
		<div class="dashboard-status">
			<user-level :status="userData.status"></user-level>
		</div>
		<!--end User level-->

		</div>
	</div>
</template>
<script>
	import TextBlock from "_common/components/Text-block.vue"
	import Logo from "_common/components/Logo.vue"
	import Loader from '_common/components/Loader.vue'
	import UserLevel from '_components/includes/UserLevel.vue'
	import userService from '_service/user'

	export default {
		name: 'Dashboard',
		data() {
			return {
				userData: {}
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			}
		},
		mounted() {
			this.fetchUser()
		},
		methods: {
			fetchUser() {
				this.$store.dispatch('toggleLoader', true)
				userService
				.getSingleComplete( this.user.uid )
				.then(response => {
					this.userData = response.data
					this.$store.dispatch('toggleLoader', false)

				}).catch(error => {
					this.$store.dispatch('toggleLoader', false)
					growl.error(error.data.message)
				})
				this.$store.dispatch('toggleLoader', false)
			}
		},
		components: {
			TextBlock,
			UserLevel
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

		.dashboard-status {
			display: flex;
			justify-content: flex-start;
			padding: 10px;
			margin: 10px 0;

			@media screen and(max-width: $screen-sm) {
				justify-content: center;
			}
		}
	}
</style>
