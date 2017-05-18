<template>
	<div v-if="modal.confirm">
		<div class="modal-base">
			<i class="fa fa-times close" @click="close"></i>
			<div class="modal-base__content">
				<p class="text">{{message}}</p>
				<button class="btn btn-red" @click="callCallback">Sim</button>
				<button class="btn btn-orange" @click="close">Não</button>
			</div>
		</div>
		<div class="overlay" @click="close"></div>
	</div>
</template>

<script>

	export default {
		props: {
			callback: {
				type: Function,
				required: true
			},
			message: {
				type: String,
				default: ''
			}
		},
		computed: {
			modal: function () {
				return this.$store.state.Modal
			}
		},
		methods: {
			close () {
				this.$store.dispatch('toggleConfirm', false)
			},
			callCallback() {
				this.callback()
				this.close()
			}
		}
	}
</script>

<style lang="sass" scoped>
@import "~_config/_vars.scss";
@import "~_config/_commons.scss";

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
	min-width: 300px;
	min-height: 230px;
	box-shadow: 3px 4px 16px -5px ;
	display: flex;
	justify-content: center;
	align-items: center;

	.modal-base__content {
		height: 100px;

		.text {
			font-size: 18px;
			font-weight: bold;
		}

		.btn {
			width: 100%;
		}
	}

	.close {
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 25px;
	}
}

</style>
