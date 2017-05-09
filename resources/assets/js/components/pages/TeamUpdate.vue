<template lang="html">
	<div class="team">
		<div class="form-group">
			<input v-show="edit" class="form-control" v-model="team.name">
			<h4 v-show="!edit" class="title">{{ team.name }}</h4>
		</div>

		<div v-if="insert" class="insert-users">
			<h4 v-show="!edit" class="title">Lista de usuários</h4>
			<div class="list">
				<div v-for="user in users" class="list__item">
					<i @click="insertUser(user.uid)" class="btn btn-black btn-status">Inserir</i>
					<div class="item">
						<div class="description">
							<!--<img :src="user.photo" alt="" height="50" width="50">-->
							<h4 class="name" >{{ user.name }}</h4>
						</div>
						<p class="email">{{user.email}}</p>
						
					</div>
				</div>
			</div>
		</div>
		<div v-else class="team-users">
			<h4 v-show="!edit" class="title">Lista de usuários do time</h4>
			<div v-if="team.users.length > 0" class="list">
				<div v-for="user in team.users" class="list__item">
					<i @click="removeUser(user.uid)" class="fa fa-trash btn-remove"></i>
					<i class="btn btn-black btn-status">Ver status</i>
					<div class="item">
						<div class="description">
							<!--<img :src="user.photo" alt="" height="50" width="50">-->
							<h4 class="name" >{{ user.name }}</h4>
						</div>
						<p class="email">{{user.email}}</p>
						
					</div>
				</div>
			</div>
			<div v-else>Nenhum usuário cadastrado</div>
		</div>
		<i v-if="insert" @click="toggleInsert" class="btn btn-orange">voltar</i>
		<i  v-else @click="toggleInsert" class="btn btn-red">Inserir usuário</i>
	</div>
</template>
<script>
	import CourseService from '_service/course'
	import growl from "growl-alert"
	import TeamList from '_components/includes/list/TeamList.vue'
	import teamService from '_service/team'

	export default {
		data() {
			return {
				edit: false,
				insert: false,
				teamUsers: []
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			},
			team: function () {
				return this.$store.state.Team
			},
			users: function () {
				return this.$store.state.Users
			}
		},
		methods: {
			insertUser( userId ) {
				this.$store.dispatch('toggleLoader', true)
				teamService
				.insertUser(userId, this.team.key )
				.then(response => {
					if (response.data.status) {
						this.$store.dispatch('toggleLoader', false)
						growl.success('Inserido com sucesso')
						window.location.reload()
						this.toggleInsert()
					} else {
						this.$store.dispatch('toggleLoader', false)
						growl.error(response.data.message)
					}
				})
				.catch(error => {
					this.$store.dispatch('toggleLoader', false)
					growl.error(error.data.message)
				})
				this.$store.dispatch('toggleLoader', false)
			},
			removeUser( userId ) {
				this.$store.dispatch('toggleLoader', true)
				teamService
				.removeUser(userId, this.team.key )
				.then(response => {
					if (response.data.status) {
						this.$store.dispatch('toggleLoader', false)
						growl.success('Removido com sucesso')
						window.location.reload()
					} else {
						this.$store.dispatch('toggleLoader', false)
						growl.error(response.data.message)
					}
				})
				.catch(error => {
					this.$store.dispatch('toggleLoader', false)
					growl.error(error.data.message)
				})
				this.$store.dispatch('toggleLoader', false)
			},
			toggleInsert(){
				this.insert = !this.insert
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	@import "~_config/_commons.scss";

	.team {
		max-width: 500px;
		padding: 15px;


		.title {
			font-size: 20px;
			display: flex;

			&:before {
				content: '';
				display: block;
				margin-right: 5px;
				width: 10px;
				height: 10px;
				background-color: $orange-base;
				border-radius: 50%;
				margin-top: 9px;
				opacity: 0.35;
			}
		}

		.team-users, .insert-users {
			width: 100%;

			.list__item {
				display: flex;
				padding: 5px 20px;
				height: 100px;
				margin: 5px auto;
				cursor: pointer;
				border: solid 1px $color-grey--base;
				transition: .5s all ease;
				background-color: white;
				position: relative;

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

				.btn-remove {
					right: 10px;
					top: 10px;
					cursor: pointer;
					font-size: 20px;
					position: absolute;
				}

				.btn-status {
					right: 10px;
					bottom: 10px;
					width: 100px;
					cursor: pointer;
					position: absolute;
					margin-right: 0;
				}

			}
		}
	}
</style>
