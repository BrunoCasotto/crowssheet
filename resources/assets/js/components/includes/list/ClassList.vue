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
					<span @click="callConfirmation( classData.key )" class="fa fa-trash icon-delete"></span>
				</div>
			</div>
		</div>
		<confirmation :callback="deleteClass" message="Deseja remover essa aula ?"></confirmation>
	</div>
</template>
<script>
	import classService from '_service/class'
	import growl from "growl-alert"
	import Confirmation from '_common/components/modal/Confirmation.vue'

	export default {
		data () {
			return {
				confirm: true,
				key: ''
			}
		},
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
		},
		methods: {
			deleteClass() {
				this.$store.dispatch('toggleLoader', true)
				 classService
				.delete( this.course.key, this.key )
				.then(response => {
					if (response.data.status) {
						this.$store.dispatch('toggleLoader', false)
						growl.success('Removido')
						window.location.reload()
					} else {
						this.$store.dispatch('toggleLoader', false)
						growl.error(response.data.data.message)
					}
				})
				.catch (error => {
					this.$store.dispatch('toggleLoader', false)
					growl.error(error.data.message)
				})
				this.$store.dispatch('toggleLoader', false)
			},
			callConfirmation ( key ) {
				this.key = key
				this.$store.dispatch('toggleConfirm', true)
			}
		},
		components: {
			Confirmation
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
