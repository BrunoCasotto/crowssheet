<template lang="html">
	<div class="dashboard">
		<!-- information -->
		<div class="dashboard-home">
		<div class="content__info">
			<div class="block">
				<text-block 
				appearance="block--sm"
				color= "#828c94"
				:title="'Visualizações'"
				:text="'100'"
				></text-block>
			</div>
			<div class="block">
				<text-block 
				appearance="block--sm"
				color= "#ff5c46"
				:title="'Total Alunos'"
				:text="'60'"
				></text-block>
			</div>
			<div class="block">
				<text-block 
				appearance="block--sm"
				color= "#2c9fc8"
				:title="'Média turma'"
				:text="'6.0'"
				></text-block>
			</div>	
		</div>
		<!-- end information -->
		<Component-table
			:titles="['Materia','Alunos', 'Média']"
			:content="[['matematica',20,3.2],['fisica',30,4],['historia',30,2]]"
		></Component-table>
		</div>
	</div>
</template>
<script>
	import axios from "axios"
	import growl from "growl-alert"
	import moment from 'moment'
	import ComponentTable from "_common/components/Table.vue"
	import TextBlock from "_common/components/Text-block.vue"

    export default {
        name: 'Home',
		components: {
			ComponentTable,
			TextBlock
		},
		methods: {
			storePost () {
				axios.post('/post/save', {
					post: this.post
				})
				.then(response => {
					if (response.data) {
						this.post.title = ""
						this.post.text = ""
						growl.success('Postado')
					}
				})
				.catch(error => {
					growl.error('Ocorreu um erro')
				})
			},
			fetchData () {
				axios.get('/json/post/all/category')
					.then(response => {
						this.categories = response.data
					})
					.catch(error => {})
			},
			getPreviousMain () {
				this.post.text = tinymce.get('tiny-text-area').getContent()
			}
		}
    }
</script>

<style lang="sass" scoped>
	@import "~_config/_vars.scss";
	.dashboard {
		.content__info {
			display: flex;
			flex-wrap: wrap;
			position: relative;
			justify-content: space-around;
			align-content: center;
			width: 100%;
			top: -50px;
			
			.block {
				margin: 5px;
				display: flex;
				justify-content: center;
			}

			@media screen and(max-width: $screen-md) {
				top: 0px;
			}

			@media screen and(max-width: $screen-xs) {
				display: block;
			}

		}
		
		.dashboard-home {
			width: 100%;
			height: 400px;
			margin: 0 auto;
		}
	}
</style>
