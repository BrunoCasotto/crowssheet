<template lang="html">
<div class="level">
	<div  v-if="status.level" class="level-block">
		<p class="block-level">level: <span>{{ status.level }}</span></p>
		<div class="block-progress">
			<p class="progress-text">{{ progress }}</p>
			<div 
			class="progress-bar"
			v-bind:style="{ width: progress }" 
			></div>
		</div>
	</div>
	<div v-else class="spinner"></div>
</div>
</template>

<script>

	export default {
		data() {
			return {
				progress:this.status.progress? `${this.status.progress} %` : '0%'
			}
		},
		props: {
			status: {
				type: Object,
				default: function() {
					return {}
				}
			}
		}
	}

</script>
<style lang="sass" scoped>
	@import "~_config/_vars.scss";

	.level {
		position: relative;
		background-color: $orange-base;
		border: solid 1px $color-grey--base;
		padding: 15px;
		width: 300px;
		height: 100px;

		.spinner {
			border: 8px solid $black-base;
			border-right-color: transparent;
		}

		.level-block {
			position: relative;

			.block-level {
				font-size: 18px;
				color: white;
				font-weight: bold;
				display: flex;
				justify-content: space-between;

				span {
					color: $red-base;
				}
			}

			.block-progress {
				width: 100%;
				height: 20px;
				overflow: hidden;
				border-radius: 8px;
				border: solid 1px $black-base;
				position: relative;
				background: white;

				.progress-bar {
					height: 100%;
					background: $black-base;
					position: absolute;
					left: 0;
					width: 10%;
				}

				.progress-text {
					color: $red-base;
					font-size: 18px;
					font-weight: bold;
					text-align: center;
					line-height: 100%;
					width: 100%;
					position: absolute;
				}
			}
		}
	}
</style>
