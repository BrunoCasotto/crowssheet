<template lang="html">
	<div class="boletim">
		<div class="container boletim__content">
			<h3 class="boletim__title">{{tema}}</h3>
			<div class="boletim__image">
				<img src="{{imageUrl}}" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Programming',
		props: {
			tema: ''
		},
		data () {
			return {
				imageUrl: 'https://firebasestorage.googleapis.com/v0/b/blog-9d0bc.appspot.com/o/boletim%2FScreen%20Shot%202017-02-01%20at%209.29.42%20PM.png?alt=media&token=81e77722-7e20-4d30-af16-fb2eb55a2272'
			}
		}
	}
</script>
<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	.boletim {
		margin-bottom:40px;

		.boletim__content {
				.boletim__title {
					text-align: center;
					font-size: 4rem;
					font-family: -webkit-pictograph;
					padding: 20px 0;
				}

				.boletim__image {
					margin: 0 auto;

					img {
						max-width: 100%;
					}

					/*@media screen and(max-width: $screen-xg) {
						width: 1000px;
					}
					@media screen and(max-width: $screen-lg) {
						width: 700px;
					}
					@media screen and(max-width: $screen-md) {
						width: 500px;
					}
					@media screen and(max-width: $screen-sm) {
						width: 90%;
					}*/
				}
		}
	}
</style>
