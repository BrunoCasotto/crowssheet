<template lang="html">
	<div class="test">

		<template v-for="( question, index) in test.questions">
			<div class="test__question">
				<div class="test__question__description">
					<h4 class="description__number">{{ index+1 }}</h4>
					<p class="description__text">{{ question.description }}</p>
				</div>
				<div class="test__question__answer">
					<label>
						<input v-model="answer[index]" name="answer" :value="index+'-opt1'" type="radio"></input>
						 {{ question.opt1 }} 
					</label>
					<label>
						<input v-model="answer[index]" name="answer" :value="index+'-opt2'" type="radio"></input>
						 {{ question.opt2 }} 
					</label>
					<label>
						<input v-model="answer[index]" name="answer" :value="index+'-opt3'" type="radio"></input>
						 {{ question.opt3 }} 
					</label>
					<label>
						<input v-model="answer[index]" name="answer" :value="index+'-opt4'" type="radio"></input>
						 {{ question.opt4 }} 
					</label>
				</div>
			</div>
		</template>

		<div class="test__controller">
			<button class="btn btn--back">Abandonar teste</button>
			<button class="btn btn--finish">Finalizar a prova</button>
		</div>
	</div>
</template>
<script>
	import growl from "growl-alert"
	export default {
		data() {
			return {
				answer: []
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			},
			test: function() {
				return this.$store.state.Test
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	.test {
		width: 100%;
		max-width: 700px;

		.test__question {
			min-height: 200px;
			width: 100%;
			background: white;
			border: solid 1px $color-grey--base;
			margin-top: 10px; 

			&__description {
				display: flex;
				border-bottom: solid 1px $color-grey--base;

				.description__number {
					font-size: 2.5rem;
					padding: 15px;
					margin: 0;
				}

				.description__text {
					text-align: justify;
					margin: 15px 15px 15px 0;
					padding-bottom: 15px;
				}
			}

			&__answer {
				padding-left: 50px;
				padding-top: 10px;

				label {
					width: 100%;
					padding-bottom: 10px;
				}
			}
		}

		.test__controller {
			width: 100%;
			display: flex;
			justify-content: flex-end;
			padding: 10px;
			@media screen and( max-width: $screen-sm ) {
				display: block;
			}

			.btn {
				min-width: 100px;
				color: white;
				font-weight: bold;
				 margin: 5px;

				 @media screen and( max-width: $screen-sm) {
					 width: 100%;
					 margin-top: 5px;
				 }

				&--back {
					background-color: $red-base;
					&:hover {
						background-color: lighten($red-base,15);
					}
				}

				&--finish {
					background-color: $orange-base;
					&:hover {
						background-color: lighten($orange-base,15);
					}
				}
			}
		}
	}
</style>
