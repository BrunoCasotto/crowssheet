<template lang="html">
	<div class="user-stats">
		<ul class="nav nav-tabs">
			<li v-bind:class="{ 'active': tab=='profile' }">
				<a @click="tab = 'profile'" href="#">Perfil</a>
			</li>
			<li v-bind:class="{ 'active': tab=='history' }">
				<a href="#" @click="tab = 'history'">Historico de atividades</a>
			</li>
		</ul>
		<div v-if="tab == 'profile'">
			<h4>{{ user.name }}</h4>
			<label>Email:</label>
			<p class="lead">{{ user.email }}</p>
			<label>Média do aluno:</label>
			<p class="lead">{{ user.status.average }}</p>
			<label>Atividades finalizadas:</label>
			<p class="lead">{{ totalTests }}</p>
		<div>

		<user-level :status="user.status"></user-level>
	</div>
</template>
<script>
	import TextBlock from "_common/components/Text-block.vue"
	import UserLevel from '_components/includes/UserLevel.vue'

	export default {
		data() {
			return {
				totalTests: 0,
				tab: 'profile'
			}
		},
		computed: {
			user: function () {
				return this.$store.state.CompleteUser
			}
		},
		mounted() {
			this.countTeste()
		},
		methods: {
			countTeste() {
				let history = JSON.parse(this.user.status.completedTests)
				this.totalTests = history.length
			}
		},
		components: {
			UserLevel,
			TextBlock
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	@import "~_config/_commons.scss";

	.user-stats {
		max-width: 500px;
		width: 100%;
		padding: 10px;
	}

	.lead {
		margin-bottom: 5px;
	}

	.line {
		width: 100%;
		height: 1px;
		background-color: $color-grey-blue-light;
		opacity: 0.4;
	}

	a {
		color: black;
		font-weight: bold;
	}
</style>
