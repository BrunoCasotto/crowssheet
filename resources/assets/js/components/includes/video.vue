<template>
	<div v-if="videoId" class="video">
		<button v-if="videoIsActive" @click="toggleVideo" class="btn btn-orange">Esconder o video</button>
		<button v-else @click="toggleVideo" class="btn btn-orange">Exibir o video</button>

		<youtube v-if="videoIsActive" @ready="ready"  :video-id="videoId"></youtube>
		<div v-if="spinner" class="spinner"></div>
	</div>
</template>

<script>
	import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'

	export default {
		data() {
			return {
				videoId			: null,
				videoIsActive	: false,
				spinner			: false
			}
		},
		props: {
			url: {
				type	: String,
				default	: ''
			}
		},
		mounted() {
			this.fetchVideo()
		},
		watch: {
			'url': function() {
				this.fetchVideo()
			}
		},
		methods: {
			fetchVideo() {
				this.videoId = false
				this.videoId = getIdFromURL(this.url)
			},
			toggleVideo() {
				this.videoIsActive = !this.videoIsActive
				if(this.videoIsActive) {
					this.spinner = true
				}
			},
			ready() {
				this.spinner = false
			}
		}
	}
</script>

<style lang="sass">
	@import "~_config/_vars.scss";
	@import "~_config/_commons.scss";

	.video {
		position: relative;

		button {
			margin-bottom: 10px;
		}
	}
</style>