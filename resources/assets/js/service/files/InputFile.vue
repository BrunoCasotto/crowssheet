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
                var config = {
                    apiKey: "AIzaSyCKAZF2oajMvnEfgOJwBO__PPqZ3nUgOkA",
                    authDomain: "blog-9d0bc.firebaseapp.com",
                    databaseURL: "https://blog-9d0bc.firebaseio.com",
                    storageBucket: "blog-9d0bc.appspot.com",
                    messagingSenderId: "642355234164"
                }
                firebase.initializeApp(config)
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
