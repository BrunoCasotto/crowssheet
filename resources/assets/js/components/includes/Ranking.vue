<template>
	<div :class="['ranking', appearance]">
		<h4 v-if="type == 'progress'"> Ranking de progresso </h4>
		<div class="ranking__table">
			<table>
				 <thead>
					<th>Pos</th>
					<th>Nome</th> 
					<th>Progresso</th>
				</thead>
				<template v-for="(user, index) in showList">
					<tr>
						<td class="lead">{{ index + 1 }}</td>
						<td class="lead">{{ user.name }}</td> 
						<td class="lead">{{ filterFloat(user.real_progress) }}</td>
					</tr>
				</template>
			</table>
			<div v-if="spinner" class="spinner"></div>
			<button v-if="show" @click="toggleShow()" class="btn btn-orange"> ver menos </button>
			<button v-else @click="toggleShow()" class="btn btn-orange"> ver mais </button>
		</div>
	</div>
</template>

<script>
	import ReportService from '_service/report'

	export default {
		data() {
			return {
				list: [],
				show: false,
				showList: [],
				spinner: true
			}
		},
		props: {
			type: {
				type: String,
				default: 'progress'
			},
		appearance: {
				type: String,
				default: 'full'
			}
		},
		watch: {
			'show':function(){
				if(this.show) {
					this.showList = this.list
				} else {
					this.showList = this.list.slice(0, 4);
				}
			}
		},
		mounted() {
			this.fetchRanking()
		},
		methods: {
			filterFloat( number ) {
				number = String(number)
				return number.replace(".", ",")
			},
			fetchRanking() {
				this.spinner = true
				ReportService.getRanking( this.type )
				.then(response => {
					if(response.data) {
						this.list = response.data
						this.showList = response.data.slice(0, 4);
					}
					this.spinner = false
				})
				.catch(error => { 
					this.spinner = false
				})
			},
			toggleShow() {
				this.show = !this.show
			}
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	@import "~_config/_commons.scss";

	.ranking {
		padding: 10px;

		&__table {
			position: relative;
			min-height: 130px;
			width: 100%;


			.btn {
				@media screen and(max-width: $screen-sm) {
					margin-top: 60px;
				}
			}

			table {
				width: 100%;

				thead {
					th {
						text-align: center;
						font-size: 22px;
					}
				}

				tr {

					&:first-child {
						heigth: 200px;
						font-size: 25px;
						color: red;
					}

					td {
						text-align: center;
						font-size: 20px;
						max-width: 150px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}
	}

	.full {
		width: 100%;
	}

	.partial {
		width: 100%;
		max-width: 500px;
	}
</style>