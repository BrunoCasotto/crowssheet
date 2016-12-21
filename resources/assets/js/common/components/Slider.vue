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
