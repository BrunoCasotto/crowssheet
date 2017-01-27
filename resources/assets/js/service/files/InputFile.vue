<template>
    <div class="well input-file">
        <img src="{{pictureUrl}}" class="img-thumbnail input-file__img-previous">
        <button class="btn btn-default btn__save" v-on:click="clear">Remove</button>
        <div class="form-group">
            <label for="exampleInputEmail1">{{title}}</label>
            <input type="file" name="file" id="input" class="form-control" v-model="file" @change="upload">
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import growl from "growl-alert"
    import axios from "axios"

    export default {
        name: 'input-file',
        props:{
            title: '',
            imageName: '',
            imageLocale: ''
        },
        data: function() {
            return {
                file: '',
                pictureUrl: '/images/default.jpg'
            }
        },
        ready: function() {
            this.init()
        },
        methods: {
            init: function() {
                axios.post('/token')
				.then((response)=> {
					console.log(response.data)
                    firebase.initializeApp(response.data)
				})
				.catch((error)=> {
					growl.error('Ocorreu um erro')
				})
            },
            upload: function() {
                let storageRef = firebase.storage().ref()
                let file = document.getElementById('input').files[0]
                let extension = '.'+file['type'].split('/')[1]
                let uploadTask = storageRef.child(this.imagelocale + this.imageName+extension).put(file)
                uploadTask.on('state_changed', (snapshot)=>{
                    growl.success('Upload em andamento: '+snapshot['totalBytes']+'b')
                }, function(error) {
                    growl.error('ocorreu um erro ao upload')
                }, ()=> {
                    this.pictureUrl = uploadTask.snapshot.downloadURL
                    this.$dispatch('picture-url',this.pictureUrl)
                     growl.success('upload concluido')
                })
            },
            clear: function() {
                this.file = ''
                this.pictureUrl= '/images/default.jpg'
            }
        }
}
</script>

<style lang="sass" scoped>
    .input-file {
        .input-file__img-previous {
            max-width: 200px;
        }
    }    
</style>
