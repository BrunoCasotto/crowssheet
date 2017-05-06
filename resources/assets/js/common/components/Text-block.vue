<template lang="html">
	<div 
	v-bind:style="{ background: color }" 
	v-bind:class="['block-text', appearance]"
	>
		<div class="text">
			<h5>{{title}}</h5>
			<p>{{text}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() { 
			return {
				isHidden: false
			}
		},
		props: {
			appearance: '',
			color: '',
			title: '',
			text: ''
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";

	.block-text {
		position: relative;

		.text {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;	

			h5 {
				font-size: 1.3rem;
				font-weight: bold;
			}

			p {
				font-size: 1.1rem;
			}
		}
	}

	.block--sm {
		width: 200px;
		height: 100px;

		@media screen and(max-width: $screen-sm) {
			display: block;
			top: 10px;
		}
	}
</style>
