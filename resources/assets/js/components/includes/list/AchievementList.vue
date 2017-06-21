<template lang="html">
	<div class="achievement">
		<h4>Inventário de itens:</h4>
		<div v-if="achievements.length > 0" class="list">
			<div v-for="ach in achievements" class="item">
				<h4 class="name"><span class="qtd">{{ ach.quantity }} x </span>{{ ach.name }}</h4>
				<span class="description">{{ ach.description }}</span>
			</div>
		</div>
		<div v-else>
			<p>Nenhum item no inventário.</p>
		</div>
	</div>
</template>
<script>
	export default {
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
	.achievement {
		border: solid 1px #bdbdbd;
		max-width: 300px;
		padding: 10px;
		margin-top: 5px;
		max-height: 300px;
		overflow-y: scroll;

		@media screen and(max-width: $screen-sm) {
			 margin: 10px auto;
		}

		.list {
			.item {
				.qtd {
					color: $orange-base;
				}
			}
		}
	}
</style>
