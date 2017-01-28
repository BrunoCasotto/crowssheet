<template lang="html">
	<div :class="'post post--'+post.appearance" v-for="post in posts">
		<div class="post__content">
			<div class="post__content__image">
				<a class="controller__see-more" href="{{'/post/'+post.key}}">
					<img src="{{post.image}}" alt="">
				</a>
			</div>
			<div class="content__controller">
				<p class="controller__date">09/08/2016</p>
				<a class="controller__see-more" href="{{'/post/'+post.key}}">Ver mais</a>
			</div>
			<div class="post__content__text">
				<a class="title" href="{{'/post/'+post.key}}">{{ post.title }}</a>
				<p class="sub-title">{{ post.subtitle }}</p>
				<div class="text-previous">
					<p>{{ post.text }}</p>
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
		
		if(this.appearance == 'single')
			this.getPost()
	},
  	methods: {
		fetchPosts: function(){
			axios.get('/json/post/all')
			.then((response)=> {
				this.posts = response.data.reverse()
			})
			.catch((error)=> {})
		},
		getPost: function(){
			axios.get('/json/post/get?postId='+this.postId)
			.then((response)=> {
				this.posts = [response.data]
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
		height: 500px;

		&--big {
			width: 45%;
		}
		&--small {
			width: 25%;
		}
		@media screen and(max-width: $screen-sm) { 
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
					width: 100%;
					p {
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				.title {
					font-size: 2rem;
					color: black;
				}

				.sub-title {
					font-size: 1.3rem;
					font-weight: bold;
				}
			}
		}
	}
</style>
