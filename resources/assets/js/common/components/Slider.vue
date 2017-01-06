<template lang="html">
	<div>
		Slider
		<!--<slider :items="items" :speed="2" :delay="3" :pause="true" :autoplay:"true" :dots="true" :arrows:"true"></slider>-->
	</div>
</template>
<script>
// import Slider from 'vue-slider'
export default {
  data () {
    return {
		items: [
			{ 
				src: '/images/wall2.png',
				alt: '/images/wall2.png'
			},
			{
				src: '/images/wall1.jpeg',
				alt: '/images/wall1.jpeg'
			},
			{
				src: '/images/wall3.png',
				alt: '/images/wall3.png'
			},
			{
				src: '/images/wall4.jpeg',
				alt: '/images/wall4.jpeg'
			},
			{
				src: '/images/wall5.png',
				alt: '/images/wall5.png'
			},
			{
				src: '/images/wall6.png',
				alt: '/images/wall6.png'
			}
		]
	}
},
components: {
	Slider
},
props: {
	content: []
}
}
</script>

<style lang="css">

</style>
