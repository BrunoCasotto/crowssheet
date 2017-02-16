<template lang="html">
	<div>
		<div class="post" v-if="post.status == 'visible'" v-for="post in posts">
			<div class="post__content">
				<div class="post__content__image">
					<a class="controller__see-more" :href="`/post/${post.key}`">
						<img :src="post.image" alt="">
					</a>
				</div>
				<div class="content__controller">
					<p class="controller__date" v-html="post.date || '00/00/0000'"></p>
				</div>
				<div class="post__content__text">
					<a class="title" :href="`/post/${post.key}`" v-html="post.title"></a>
					<p class="sub-title" v-html="post.subtitle"></p>
					<div class="text-previous">
						<p v-html="post.previous"></p>
					</div>
					<div class="text-main">
						<p v-html="post.text"></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		name: 'SinglePost',
		props: { 
			postId: '',
			appearance: ''
		},
		data () {
			return {
				posts: {}
			}
		},
		mounted () {
			this.getPost()
		},
		methods: {
			getPost (){
				axios.get(`/json/post/get?postId=${this.postId}`)
					.then(response => {
						this.posts = [response.data]
					})
					.catch(error => {})
			}
		}
	}
</script>
<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	.post {
		padding: 20px 0 40px 0;
		.post__content {
			&__image {
				overflow: hidden;
				img {
					width: 100%;
				}
			}
			.content__controller {
				display: flex;
				height: 25px;
				line-height: 25px;
				justify-content: space-between;
				padding: 0 10px;

				.controller__date {

				}
				.controller__see-more {
					color: black;
				}
			}

			&__text {
				flex:1;
				padding: 0 10px;

				.text-previous {
					overflow: hidden;
				}

				.title {
					font-size: 2rem;
					color: black;
					@media screen and(max-width: $screen-md) { 
						font-size: 1.3rem;
					}
					@media screen and(max-width: $screen-sm) { 
						font-size: 1rem;
					}

				}

				.sub-title {
					font-size: 1.3rem;
					font-weight: bold;
					@media screen and(max-width: $screen-md) { 
						font-size: 1.2rem;
					}
					@media screen and(max-width: $screen-sm) { 
						font-size: 1rem;
					}
				}
			}
		}
	}
</style>
