<template lang="html">
	<div class="class-list">
		<h4 v-if="classes.length > 0" class="title">Lista de aulas</h4>
		<h4 v-else class="title">Nenhuma aula cadastrada</h4>
		<div class="list">
			<div v-for="classData in classes" class="list__item">
				<div class="item">
					<a :href="'/class/update?id='+ classData.key+'&courseId='+ course.key +'&userId='+ user.uid">
						<h4 class="item-title" >{{ classData.title }}</h4>
					</a>
					<p class="item-description" v-html="classData.description"></p>
				</div>
				<div class="controller">
					<i @click="delete( classData.key )" class="fa fa-trash icon-delete"></i>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			classes: {
				type: Array,
				required: true
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			},
			course: function() {
				return this.$store.state.Course
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	.class-list {
		width: 100%;
		padding: 10px;

		.title {
			font-size: 20px;
			margin-left: 10px;
		}

		.list__item {
			display: flex;
			padding: 5px 20px;
			height: 100px;
			margin: 5px auto;
			cursor: pointer;
			border: solid 1px $color-grey--base;
			transition: .5s all ease;
			background-color: white;

			&:hover {
				height: 200px;
			}

			&:first-child {
				border-top: solid 1px $color-grey--base;
			}

			.item {
				flex: 5;
				overflow: hidden;

				a {
					color: $black-base;

					&:hover {
						background-color: lighten($black-base,15);
					}
				}
			}

			.controller {
				padding: 5px;
				position: relative;

				.icon-delete {
					position: absolute;
					right: 10px;
					top: 10px;
					cursor: pointer;
					font-size: 20px;

					&:hover {
						color: darken( $black-base ,20);
					}
				}

			}
		}
	}
</style>
