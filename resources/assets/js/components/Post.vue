<template lang="html">
	<div class="post">
		<a class="title">this is a post</a>
		<div class="post__content">
			<div class="post__content__image">
				<img src="/images/biblia.jpeg" alt="">
			</div>
			<div class="post__content__text">
				<p class="text__title">Prévia de um tópico</p>
				<p class="text__previous">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
					mollit anim id est laborum.
				</p>
				<button class="btn btn-default">Ver mais</button>
			</div>
			<div class="post__content__controller">
				
			</div>
		</div>

	</div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="sass" scoped>
	@import "~_app/variables.scss";

	.post {
		border-top: solid 1px $color-blue--light;
		border-bottom: solid 1px $color-blue--light;
		display: flex;
		flex-direction: column;
		padding: 15px;
		width: 100%;

		.title {
			font-size: 2rem;
			color: $color-blue--base;
		}

		&__content {
			display: flex;
			justify-content: center;
			align-items: center;

			&__image {
				height: 150px;

				img {
					height: 100%;
				}
			}

			&__text {
				flex:1;
				padding: 10px;

				.text__title {
					font-size: 2rem;
				}
			}
		}
	}
</style>
