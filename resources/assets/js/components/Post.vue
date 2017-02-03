<template lang="html">
	<div :class="'post post--'+post.appearance" v-if="post.status == 'visible'" v-for="post in posts">
			<div class="post__content"> 
				<div class="post__content__image">
					<a class="controller__see-more" href="{{'/post/'+post.key}}">
						<img src="{{post.image}}" alt="">
					</a>
				</div>
				<div class="content__controller">
					<p class="controller__date">{{{post.date || '00/00/0000'}}}</p>
					<a class="controller__see-more" href="{{'/post/'+post.key}}">Ver mais</a>
				</div>
				<div class="post__content__text">
					<a class="title" href="{{'/post/'+post.key}}">{{{ post.title }}}</a>
					<p class="sub-title">{{{ post.subtitle }}}</p>
					<div class="text-previous">
						<p>{{{ post.previous }}}</p>
					</div>
				</div>
			</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
  props: { 
		postId: '',
		appearance: ''
	},
	data: function() {
		return {
			posts: {}
		}
	},
	ready: function() {
		this.fetchPosts()
	},
  	methods: {
		fetchPosts: function(){
			axios.get('/json/post/all')
			.then((response)=> {
				this.posts = response.data.reverse()
			})
			.catch((error)=> {})
		}
  	}
}
</script>
<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	.post {
		margin: 10px;
    	overflow: hidden;
  		border-radius: 2px;
		background-color: white;
		box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
		transition: all 1s ease;
		max-height: 500px;
		max-width: 50%;

		&--big {
			width: 45%;
		}
		&--small {
			width: 25%;
		}
		@media screen and(max-width: $screen-sm) { 
			max-width: 100%;
			width: 100%;
		}
		

		&:hover {
			box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
		}

		.post__content {
			&__image {
				max-height: 300px;
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
					width: 100%;
					max-height: 140px;
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
