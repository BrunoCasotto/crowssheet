<template lang="html">
	<table class="content__table">
			<thead>
				<tr class="no-strip">
					<th v-for="title in titles">
						{{title}}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(line, index) in content" :class="[{'strip' : index % 2 == 0},{'no-strip' : index % 2 != 0} ]">
					<td v-for="column in line">{{column}}</td>
				</tr>
			</tbody>
		</table>
</template>

<script>
	export default{
		name: 'Table',
		props: {
			titles: [],
			content: []
		},
		mounted () {
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";

	.content__table {
		position: relative;
		top: 25%;
		left: 50%;
		transform: translate(-50%, -50%);

		@media screen and(min-width: $screen-lg) {
			min-width: 500px;
		}

		td, th {
			min-width: 100px;
			height: 45px;
			line-height: 45px;
			text-align: center;
		}
		.no-strip {
			background-color: $color-grey--light;
		}
		.strip {
			background-color: $color-blue--base;
		}
	}
</style>