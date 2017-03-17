<template lang="html">
   	<div class="class-form">
		<div class="class-form__content">
			<h4 class="title">Cadastro de Aula</h4>
			<form v-on:submit.prevent>

				<div class="form-group">
					<label>Matéria/Titulo</label>
					<input class="form-control">
				</div>

				<div class="form-group">
					<label>Url do vídeo</label>
					<input class="form-control" v-model="classData.video">
				</div>

				<iframe v-if="classData.video" width="420" height="315"
				:src="classData.video">
				</iframe>

				<div class="form-group">
					<label>Descrição</label>
					<textarea 
						id="form-class-description"
						class="tiny-text-area">
					</textarea>
				</div>

				<div class="form-group form-group-image well">
					<label for="exampleInputEmail1">Arquivos para download</label>
					<input type="file" name="file" id="input-data" class="form-control">
				</div>

				<div class="form-controller">
					<button class="btn btn-default btn-adicionar">+ Test</button>
					<button class="btn btn-default btn-salvar">Salvar</button>
				</div>

			</form>
		</div>
	</div>
</template>
<script>
	import growl from "growl-alert"
	export default {
		data: ()=> {
			return {
				classData: {
					video: null
				}
			}
		}

	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	.class-form {
		width: 100%;

		.class-form__content {
			margin: 20px auto;
			margin-left: 20px;

			.title {
				margin: 10px auto;
				margin-left: 40px;
			}

			form {
				max-width: 600px;
				margin: 40px;
				position: relative;

				@media screen and(max-width: $screen-md) {
					margin: 20px;
				}

				.form-group-image {
					width: 50%;
					
					@media screen and(max-width: $screen-md) {
						width: 100%;
					}
				}

				.form-controller {
					display: flex;
					width: 100%;

					.btn {
						color: white;
						font-weight: bold;
						margin-top: 20px;
						width: 100px;
					}
				
					.btn-salvar {
						background-color: $color-blue--base;

						&:hover {
							background-color: darken( $color-blue--base ,20);
						}
					}
					.btn-adicionar {
						display: none;
						background-color: $color-green--base;

						&:hover {
							background-color: darken( $color-green--base ,20);
						}
					}
				}

			}
		}
	}

</style>
