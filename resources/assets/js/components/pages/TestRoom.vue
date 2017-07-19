<template lang="html">
	<div class="test">
		<div v-if="done"class="loader-overlay block-page">
			<div class="final__message">
				<i  v-if="result.gift" class="fa fa-gift gift"></i>
				<h3 v-if="result.gift" >{{result.gift}}</h3>
				<p class="">{{ result.text }}</p>
			</div>
			<a :href="'/classroom/'+classData.courseId+'/'+classData.key" class="btn btn-orange">Voltar</a>
		</div>

		<div  v-if="this.blockTest || this.blockSchendule" class="loader-overlay block-page">
			<p v-if="this.blockTest" class="text"> Ops, você já realizou esta tarefa.
				Sua nota foi <span>{{ this.score }} </span>
				<a :href="'/classroom/'+classData.courseId+'/'+classData.key" class="btn btn-orange">Voltar</a>
			</p>
			<p v-else class="text"> Ops, a data limite do teste foi <span>{{ filterDate(this.test.schendule) }} </span>
				<a :href="'/classroom/'+classData.courseId+'/'+classData.key" class="btn btn-orange">Voltar</a>
				<span v-if="offerItemSchendule"> parece que voce têm um item de dias extras 
					<button @click="unlockTest(offerItemSchendule)" class="btn btn-black">usar</button>
				</span>
			</p>
		</div>
		<template v-else v-for="( question, index) in test.questions">
			<div class="test__question">
				<div class="test__question__description">
					<h4 class="description__number">{{ index+1 }}</h4>
					<p class="description__text">{{ question.description }}</p>
				</div>
				<div class="test__question__answer">
					<label>
						<input 
							v-model="answer[index]" 
							:name="index" 
							:value="index+'-opt1'" 
							type=
						"radio"
						></input>
						 {{ question.opt1 }} 
					</label>

					<label>
						<input 
							v-model="answer[index]" 
							:name="index" 
							:value="index+'-opt2'" 
							type="radio"
						></input>
						 {{ question.opt2 }} 
					</label>

					<label>
						<input 
							v-model="answer[index]" 
							:name="index" 
							:value="index+'-opt3'" 
							type="radio"
						></input>
						 {{ question.opt3 }} 
					</label>

					<label>
						<input 
							v-model="answer[index]" 
							:name="index" 
							:value="index+'-opt4'" 
							type="radio"
						></input>
						 {{ question.opt4 }} 
					</label>
				</div>
			</div>
		</template>

		<div class="test__controller">
			<a :href="'/classroom/'+classData.courseId+'/'+classData.key" class="btn btn--back">Abandonar atividade</a>
			<button @click="finalize()" class="btn btn--finish">Finalizar a atividade</button>
		</div>

		<!-- user items -->
		<div v-if="!offerItemSchendule && !test.blockItem" id="achievements">
			<user-items v-if="!testItem" :achievements="achievements"></user-items>
			<p v-else class="lead">O item: <mark>{{testItem.name}}</mark> está ativo.</p>
		</div>
		<h4 v-if="test.blockItem">O professor bloqueou o uso de itens nessa atividade.</h4>
	</div>
</template>
<script>
	import growl from "growl-alert"
	import testService from '_service/test'
	import moment from 'moment'
	import UserItems from '_components/includes/list/UserItems.vue'

	export default {
		data() {
			return {
				answer				: [],
				score				: 0,
				blockTest			: false,
				blockSchendule		: false,
				achievements		:[],
				offerItemSchendule	: false,
				done				: false,
				result				:{
					gift: null,
					text: null
				}
			}
		},
		computed: {
			user: function () {
				return this.$store.state.Session
			},
			test: function() {
				return this.$store.state.Test
			},
			classData: function() {
				return this.$store.state.Class
			},
			userData: function () {
				return this.$store.state.CompleteUser
			},
			testItem: function () {
				return this.$store.state.TestItem.item
			}
		},
		mounted() {
			this.checkTest()
			this.filterStats()
		},
		methods: {
			unlockTest ( item ) {
				let new_date = moment(this.test.schendule).add(item.days, 'days').format("MM-DD-YYYY")
				let now = moment().format("MM-DD-YYYY")

				if(now <= new_date) {
					this.blockSchendule = false
					this.testItem = item
				} else {
					growl.warning("Os dias desse item não são suficientes você têm apenas "+item.days+" dias")
				}
			},
			filterStats () {
				if(this.userData.status.achievements) 
					this.achievements = JSON.parse(this.userData.status.achievements)
				else
					this.achievements = []

				if(this.blockSchendule) {
					this.achievements.forEach( result=>{
						if(result.type == 'date') {
							this.offerItemSchendule = result
							return true
						}
					})
				}
			},
			checkTest() {
				let history = JSON.parse(this.test.history)

				if(history.length > 0){
					history.forEach(data => {
						if(data.userId == this.user.uid) {
							this.blockTest 	= true
							this.score 		= data.score
						}
					})
				}

				if(this.test.schendule) {
					let now = moment().format("MM-DD-YYYY")
					let testSchendule = moment(this.test.schendule).format("MM-DD-YYYY")

					if(now > testSchendule) {
						this.blockSchendule = true
					}
				}
			},
			finalize() {
				let response = {
					answers: this.answer,
					date: moment()
				}

				let test_item = null

				if(this.offerItemSchendule) {
					test_item = this.offerItemSchendule.key
				} else if(this.testItem) {
					test_item = this.testItem.key
				}
				
				this.$store.dispatch('toggleLoader', true)
				testService
				.answer(
					this.user.uid, 
					this.classData.courseId, 
					this.classData.key,
					response,
					test_item
				)
				.then(response => {

					if (response.data.status) {
						this.$store.dispatch('toggleLoader', false)
						this.done = true
						this.result.text = response.data.message

						growl.success(response.data.message)
						if(response.data.gift) {
							this.result.gift = response.data.gift
							 growl.success(response.data.gift) 
							}
					} else {
						this.$store.dispatch('toggleLoader', false)
						growl.error("Problema de conexão tente novamente")
					}

				})
				.catch(error => {
					this.$store.dispatch('toggleLoader', false)
					growl.error("Problema de conexão tente novamente")
				})
				this.$store.dispatch('toggleLoader', false)
			},
			filterDate( date ) {
				return moment( date ).format("DD-MM-YYYY")
			}
		},
		components: {
			UserItems
		}
	}
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	@import "~_config/_commons.scss";

	.test {
		width: 100%;
		max-width: 700px;
		padding: 10px;

		.message {
			color: black;
			font-size: 18px;
		}

		.final__message {
			text-align: center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			font-family: helvetica, arial, sans-serif;
			font-size: 2rem;

			i {
				font-size: 90px;
				color: $red-base;
			}
		}

		.block-page {
			opacity: 1;

			.text {
				text-align: center;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				font-family: helvetica, arial, sans-serif;
				font-size: 2rem;

				span {
					color: $red-base;
				}
			}
		}

		.test__question {
			min-height: 200px;
			width: 100%;
			background: white;
			border: solid 1px $color-grey--base;
			margin-top: 10px; 

			&__description {
				display: flex;
				border-bottom: solid 1px $color-grey--base;

				.description__number {
					font-size: 2.5rem;
					padding: 15px;
					margin: 0;
				}

				.description__text {
					text-align: justify;
					margin: 15px 15px 15px 0;
					padding-bottom: 15px;
				}
			}

			&__answer {
				padding-left: 50px;
				padding-top: 10px;

				label {
					width: 100%;
					padding-bottom: 10px;
				}
			}
		}

		.test__controller {
			width: 100%;
			display: flex;
			justify-content: flex-end;
			padding: 10px;
			@media screen and( max-width: $screen-sm ) {
				display: block;
			}

			.btn {
				min-width: 100px;
				color: white;
				font-weight: bold;
				 margin: 5px;

				 @media screen and( max-width: $screen-sm) {
					 width: 100%;
					 margin-top: 5px;
				 }

				&--back {
					background-color: $red-base;
					&:hover {
						background-color: lighten($red-base,15);
					}
				}

				&--finish {
					background-color: $orange-base;
					&:hover {
						background-color: lighten($orange-base,15);
					}
				}
			}
		}
	}
</style>
