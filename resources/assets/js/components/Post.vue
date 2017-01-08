<template lang="html">
	<div :class="'post--'+appearance">
		<a class="title">this is a post</a>
		<div class="post__content">
			<div class="post__content__image">
				<img src="{{image}}" alt="">
			</div>
			<div class="post__content__text">
				<p class="text__title" v-model="title">{{ title }}</p>
				<p class="text__previous">
					{{ text }}
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
  },
  props: {
	  title: '',
	  text: '',
	  image: '',
	  author: '',
	  appearance: ''
  }
}
</script>
<style lang="sass" scoped>
	@import "~_app/variables.scss";

	.post--previous {
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

		.post__content {
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
	.post--single {
		display: flex;
		flex-direction: column;
		padding: 20px;

		.post__content {
			display: flex;
			flex-direction: column;

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
