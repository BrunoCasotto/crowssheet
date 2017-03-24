<template lang="html">
	<div v-bind:class="['list', appearance]">
		<div class="list__content">
		<h4 class="title">Aulas</h4>
			<div class="item">
				<p>Aula 1</p>
				<div class="controller">
					<i class="fa fa-pencil"></i>
					<i class="fa fa-trash"></i>
				</div>
			</div>
			<div class="item">
				<p>Aula 2</p>
				<div class="controller">
					<i class="fa fa-pencil"></i>
					<i class="fa fa-trash"></i>
				</div>
			</div>
			<div class="item">
				<p>Aula 3</p>
				<div class="controller">
					<i class="fa fa-pencil"></i>
					<i class="fa fa-trash"></i>
				</div>
			</div>
			<div class="item">
				<p>Aula 4</p>
				<div class="controller">
					<i class="fa fa-pencil"></i>
					<i class="fa fa-trash"></i>
				</div>
			</div>
			<div class="item">
				<p>Course 1</p>
				<div class="controller">
					<i class="fa fa-pencil"></i>
					<i class="fa fa-trash"></i>
				</div>
			</div>
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

	.list {
		position: relative;
		border: solid 1px #A9A9A9;
		overflow: hidden;

		.title {
			margin-left: 10px;
		}

		&__content {
			width: 100%;
			overflow-y: scroll;
			border-top: solid 1px #A9A9A9;

			.item {
				width: 100%;
				height: 45px;
				padding: 0 10px;
				cursor: pointer;
				display: flex;
				justify-content: space-between;

				.controller {
					i {
						line-height: 45px;
						margin: 0 2px;
					}
				}


				p {
					line-height: 45px;
				}
				&:hover {
					background-color: $color-grey--light;
				}
			}
		}
	}

	.list--sm {
		width: 200px;
		height: 200px;

		.list__content {
			height: 160px;
		}
	}
</style>
