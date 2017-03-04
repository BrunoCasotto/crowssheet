<template lang="html">
	<div class="course-list">
	ROSO
		<div class="list">
			<div v-for="course in courses" class="list__item">
				courses
			</div>
		</div>
	</div>
</template>
<script>
	import courseService from '_service/course'

	export default {
		name: 'course list',
		methods: {
			
		},
		data: ()=> {
			return {
				courses: []
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	.course-list {

	}
</style>
