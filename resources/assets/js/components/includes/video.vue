<template>
	<div v-if="videoId">
		<youtube :video-id="videoId"></youtube>
	</div>
</template>

<script>
	import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'

	export default {
		data() {
			return {
				videoId: null
			}
		},
		props: {
			url: {
				type: String,
				default: ''
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
				this.videoId = null
				this.videoId = getIdFromURL(this.url)
				console.log(this.videoId)
			}
		}
	}
</script>

<style lang="sass">
	
</style>