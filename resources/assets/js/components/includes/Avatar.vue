<template>
	<div class="avatar">
		<h4>{{ avatarName }}</h4>
		<div class="avatar__image">
			<img :src="avatarUrl"></img>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			level: 0
		},
		data() {
			return {
				avatarUrl: '/images/avatar1.png',
				avatarName: ''
			}
		},
		mounted() {
			if( this.level < 5 ) {
				this.avatarUrl = `/images/avatar${this.level}.png`
			} else if( this.level >= 5 ) {
				this.avatarUrl = `/images/avatar5.png`
			}

			if( this.level == 1) {
				this.avatarName = 'Homem da cidade'
			} else 
			if( this.level == 2) {
				this.avatarName = 'Aprendiz de guerreiro'
			} else 
			if( this.level == 3) {
				this.avatarName = 'Guerreiro formado'
			} else 
			if( this.level == 4) {
				this.avatarName = 'Guerreiro de fogo'
			} else
			if( this.level >= 5 ) {
				this.avatarName = 'Rei'
			}
		}
 	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	@import "~_config/_commons.scss";

	.avatar {
		border: solid 1px #bdbdbd;
		max-width: 300px;
		padding: 10px;
		max-height: 300px;

		&__image {

			img {
				width: 150px;
			}
		}
	}
</style>
