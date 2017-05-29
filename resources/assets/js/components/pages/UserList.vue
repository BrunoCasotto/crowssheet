<template lang="html">
	<div class="user-list">
		<div class="list">
			<div class="form-group">
				<label>Filtrar por nome</label>
				<input v-model="filterName" class="form-control">
			</div>
			<template v-for="user in filteredUsers" >
				<div v-if="!user.teacher" class="list__item">
					<div class="item">
						<div class="description">
							<h4 class="name" >{{ user.name }}</h4>
						</div>
						<p class="email">{{user.email}}</p>
					</div>
					<div class="controller">
						<a 
						:href="'/report/user/'+user.uid" 
						class="btn btn-default btn-insert" 
						@click="updateCourse( user.key )">
							Ver perfil
						</a>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
	import UserService from '_service/user'
	import growl from "growl-alert"
	import ClassModal from '_common/components/modal/ClassModal.vue'
	import Searchjs from '_npm/searchjs'

	export default {
		name: 'course-list',
		data: ()=> {
			return {
				users: [],
				filterName: '',
				filteredUsers: []
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			}
		},
		mounted (){
			this.fetchUsers()
		},
		watch: {
			'filterName': function() {
				if(this.filterName.length > 0) {
					if(this.users) {
						this.filteredUsers = Searchjs.matchArray(this.users,{
							name:this.filterName,
							email: this.filterName,
							 _join: "OR",
							_text:true,
						})
					}
				} else {
					this.filteredUsers = this.users
				}
			}
		},
		components: {
			ClassModal
		},
		methods: {
			fetchUsers() {
				this.$store.dispatch('toggleLoader', true)
				UserService.getAll(this.user.uid)
				.then(response => {
					this.$store.dispatch('toggleLoader', false)
					this.users = response.data
					this.filteredUsers = response.data
				})
				.catch(error => {
					this.$store.dispatch('toggleLoader', false)
					growl.error('Ocorreu algum erro') 
				})
			}
		},
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	.user-list {
		width: 100%;
		max-width: 500px;
		margin: 20px;
		height: calc( 100vh /1.4 );
		overflow: scroll;

		.list__item {
			display: flex;
			padding: 5px 20px;
			height: 100px;
			margin: 5px auto;
			cursor: pointer;
			border: solid 1px $color-grey--base;
			transition: .5s all ease;
			background-color: white;

			&:first-child {
				border-top: solid 1px $color-grey--base;
			}

			.item {
				flex: 5;
				overflow: hidden;

				.description {
					display: flex;

					img {
						padding: 5px;
					}

					.name {
						font-weight: bold;
					}
				}

				.email {
					margin-top: 10px;
				}
			}

			.controller {
				padding: 5px;
				flex: 1;

				.btn {
					min-width: 100px;
					color: white;
					font-weight: bold;
					margin-left: auto;
				}

				.btn-insert {
					background-color: $red-base;

					&:hover {
						background-color: lighten($red-base,15);
					}
				}
			}
		}
	}
</style>
