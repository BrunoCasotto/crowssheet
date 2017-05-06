<template lang="html">
	<div class="test">

		<div class="test__question">
			<div class="test__question__description">
				<h4 class="description__number">1</h4>
				<p class="description__text">
					O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500, quando uma misturou os caracteres de um texto para criar um espécime de livro. Este texto não só sobreviveu 5 séculos.
				</p>
			</div>
			<div class="test__question__answer">
				<label><input name="answer" value="1" type="radio"></input> resposta 1</label>
				<label><input name="answer" value="2" type="radio"></input> resposta 2</label>
				<label><input name="answer" value="3" type="radio"></input> resposta 3</label>
			</div>
		</div>

		<div class="test__question">
			<div class="test__question__description">
				<h4 class="description__number">2</h4>
				<p class="description__text">
					O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500, quando uma misturou os caracteres de um texto para criar um espécime de livro. Este texto não só sobreviveu 5 séculos.
				</p>
			</div>
			<div class="test__question__answer">
				<label><input name="answer" value="1" type="radio"></input> resposta 1</label>
				<label><input name="answer" value="2" type="radio"></input> resposta 2</label>
				<label><input name="answer" value="3" type="radio"></input> resposta 3</label>
			</div>
		</div>

		<div class="test__controller">
			<button class="btn btn--back">Abandonar teste</button>
			<button class="btn btn--finish">Finalizar a prova</button>
		</div>
	</div>
</template>
<script>
	import growl from "growl-alert"
	export default {

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
