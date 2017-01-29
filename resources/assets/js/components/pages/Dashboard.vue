<template lang="html">
   	<div class="dashboard">
		<div class="dashboard__header">
			<div class="header__top">

			</div>
			<div class="header__nav">
				<div class="container header__nav__content">
					<div class="items">
						<a class="item" v-on:click="active = 'post-form'" href="#">Posts</a>
						<a class="item" v-on:click="active = 'post-form'" href="#">Páginas estáticas</a>
						<a class="item" v-on:click="active = 'static-form'" href="#">Usuarios</a>
						<a class="item" href="#">Configurações</a>
					</div>
				</div>	
			</div>
		</div>
		<div class="container dashboard__content">
			<div v-if="active == 'post-form'">
				<post-form></post-form>
			</div>
			<div v-if="active == 'static-form'">
				<static-form></static-form>
			</div>
		</div>
		<div class="dashboard__footer">

		</div>

	</div>
</template>
<script>
    import VHeader from "_components/includes/Header.vue"
	import VFooter from "_components/includes/Footer.vue"
	import PostForm from '_components/includes/dashboard/Post-form.vue'
	import StaticForm from '_components/includes/dashboard/Static-form.vue'
	
    export default {
        name: 'dashboard',
        components: {
            VHeader,
            VFooter,
			PostForm,
			StaticForm
        },
		data: function() {
			return{
				active: 'post-form'
			}
		},
		ready: function() {
	
		}
    }
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	
	.dashboard {
		.btn__save{
			margin-top: 20px;
		}

		&__header {
			background-color: $color-grey--light;
			.header__top{
				height: 100px;
				width: 100%;
			}
			.header__nav {
				background-color: $color-light-grey--base;
				&__content {
					.items {
						display: flex;
						align-items: center;

						.item {
							margin: 0 5px 0 5px;
							display: flex;
							padding: 5px;
							font-size: 1.4rem;
							color: black;
							text-decoration: none;

							&:hover {
							color: $color-grey-blue-light;
							}
						}
					}
					
				}
			}
		}

		&__content {

		}

		&__footer {

		}
	}
</style>
