<template>
	<div v-show="modal.active">
		<div class="modal-base">
			<i class="fa fa-times close" @click="close"></i>
			<div class="modal-base__content">
				<course-form v-show="modal.type == 'course-form'"></course-form>
			</div>
		</div>
		<div class="overlay" @click="close"></div>
	</div>
</template>

<script>
	import CourseForm from "_components/includes/dashboard/Course-form.vue"
    export default {
	components: {
		CourseForm
	},
    computed: {
        modal: function () {
            return this.$store.state.Modal
        }
    },
	methods: {
		close () {
			this.$store.dispatch('toggleModal', {
				type: '',
				active: false,
				data: {}
			})
		}
	}
    }
</script>

<style lang="sass" scoped>
@import "~_config/_vars.scss";

.overlay {
	background-color: $color-grey--base;
	position: fixed;
	z-index: 15;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	opacity: 0.6;
}

.modal-base {
	background-color: white;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 16;
	min-width: 500px;
	min-height: 300px;

	.modal-base__content {

	}

	.close {
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 25px;
	}
}

</style>
