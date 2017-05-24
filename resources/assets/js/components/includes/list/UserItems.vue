<template lang="html">
	<div class="achievement">
		<h4>Inventário de items:</h4>
		<div v-if="achievements.length > 0" class="list">
			<div v-for="ach in achievements" class="item">
				<h4 class="name"><span class="qtd">{{ ach.quantity }} x </span>{{ ach.name }}</h4>
				<a :href="locale+'&item='+ach.key">Utilizar</a>
				<p class="description">{{ ach.description }}</p>
			</div>
		</div>
		<div v-else>
			<p>Nenhum item no inventário.</p>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				locale: window.location.href
			}
		},
		props: {
			achievements: {
				type: Array,
				default: []
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	@import "~_config/_commons.scss";
	.achievement {
		border: solid 1px #bdbdbd;
		max-width: 300px;
		padding: 10px;
		margin-top: 5px;
		max-height: 300px;
		overflow-y: scroll;

		.list {
			.item {
				.qtd {
					color: $orange-base;
				}
			}
		}
	}
</style>
