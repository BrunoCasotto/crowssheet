<template>
	<div class="chat">
		<h4 class="title">Chat de mensagens</h4>
		<div v-if="loader" class="spinner"></div>
		<template v-else>
		<!-- list of messages-->
		<i @click="fetchComments" class="fa fa-cloud-download chat__update"></i>
		<div class="chat__content">
			<div v-for="comment in comments" class="chat__content__message">
				<p :class="['text', comment.teacher ? 'text--orange' : '' ]">{{ comment.text }}</p>
				<p class="info">{{ comment.user }} - {{ comment.date }}</p>
			</div>
			<div class="chat__controller">
				<span
					v-if="numberComment > 5 && comments.length >= 1"
					@click="pagination('back')"
					class="chat__content__see-back"
				> ver mensagens mais recentes...</span>

				<span v-if="!final"
					@click="pagination('go')"
					class="chat__content__see-more"
				> ver mensagens mais antigas...</span>
			</div>
		</div>
		<!--form to send messages-->
		<div class="chat__form">
			<label>Escreva sua mensagem...</label>
			<textarea class="form__message" rows="4" v-model="comment.text"></textarea>
			<button @click="insertComment" class="btn btn-orange">enviar</button>
		</div>
		</template>
	</div>
</template>

<script>
	import classService from '_service/class'
	import growl from "growl-alert"
	import validator from '_helpers/validator'

	export default {
		data () {
			return {
				comment: {
					user:'',
					uid: '',
					text: '',
					date: ''
				},
				comments: [],
				numberComment: 1,
				loader: true,
				final: false
			}
		},
		props: {
			classData: {
				type: Object,
				default: {}
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			},
			courseId: function() {
				return this.$store.state.Class.courseId
			}
		},
		mounted() {
			this.fetchComments()
		},
		methods: {
			insertComment() {
				if(this.validate()) {
					this.comment.user = this.user.displayName
					this.comment.uid = this.user.uid
					this.comment.teacher = this.user.teacher ? true : false
					this.comment.date = new Date().toLocaleDateString("pt-BR").slice(0,10)
					this.loader = true
					classService
					.insertComment( this.courseId, this.classData.key , this.classData, this.comment)
					.then(response => {
						if (response.data.status) {
							growl.success("Comentário enviado")
							this.fetchComments()
							this.comment.text = ''
						} else {
							this.loader = false
							growl.error(response.data.data.message)
						}
					})
					.catch (error => {
						this.loader = false
						growl.error(error.data.message)
					})
					this.loader = false
				}
			},
			pagination( way ) {
				if(way == 'go') {
					this.numberComment = parseInt(this.numberComment) + 5
				} else {
					this.numberComment = this.numberComment - 5
				}
				this.fetchComments()
			},
			fetchComments () {
				this.loader = true
				 classService
				.getComments( this.courseId, this.classData.key , this.numberComment)
				.then(response => {
					if (response.data) {
						this.loader = false
						this.comments = response.data.comments
						this.final = response.data.final
					} else {
						this.loader = false
						growl.error(response.data.data.message)
					}
				})
				.catch (error => {this.loader = false})
				this.loader = false
			},
			validate() {
				return validator.stringValidator( 'mensagem', 5, this.comment.text)
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	@import "~_config/_commons.scss";

	.chat {
		width: 100%;
		padding: 10px;
		position: relative;

		&__update {
			cursor: pointer;
			margin-bottom: 5px;
			font-weight: bold;
			color: $red-base;
			font-size: 25px;
		}

		.chat__content {

			&__message {
				border-bottom: solid 1px $color-grey--base;
				border-left: solid 1px $color-grey--base;
				border-right: solid 1px $color-grey--base;
				width: 100%;
				padding: 10px;

				&:first-child {
					border-top: solid 1px $color-grey--base;
				}

				.text {
					font-weight: 400;
					background: rgba(189, 189, 189, 0.52);
					padding: 5px;
					border-radius: 4px;
					margin: 0;

					&--orange {
						background: rgba(255, 148, 0, 0.5);
					}
				}

				.info {
					font-weight: bold;
					margin: 0;
					text-align: right;
				}
			}
			.chat__controller {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				font-size: 16px;

				.chat__content__see-more {
					font-weight: bold;
					color: $red-base;
					cursor: pointer;
				}

				.chat__content__see-back {
					font-weight: bold;
					color: $black-base;
					cursor: pointer;
				}
			}
		}

		.title {
			font-size: 18px;
		}

		.chat__form {
			padding: 10px;

			.form__message {
				width: 100%;
				padding: 5px;
			}

			.btn {
				margin: 5px;
			}
			
		}
	}
</style>
