<template lang="html">
	<div :class="'post--'+appearance" v-for="post in posts">
		<a href="{{'/post/'+post.key}}" class="title">this is a post</a>
		<div class="post__content" >
			<div class="post__content__image">
				<img src="{{post.image}}" alt="">
			</div>
			<div class="post__content__text">
				<p class="text__title" v-model="title">{{ post.title }}</p>
				<p class="text__previous">
					{{ post.text }}
				</p>
				<button class="btn btn-default">Ver mais</button>
			</div>
			<div class="post__content__controller">  
				
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
		console.log(this.postId)

		if(this.appearance == 'list')
			this.fetchPosts()
		
		if(this.appearance == 'single')
			this.getPost()
	},
  	methods: {
		fetchPosts: function(){
			axios.get('/json/post/all')
			.then((response)=> {
				this.posts = response.data
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
	@import "~_app/variables.scss";

	.post--list {
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
