<template>
    <div class="well input-file">
        <div class="form-group">
            <label for="exampleInputEmail1">{{title}}</label>
            <input type="file" name="file" id="input" class="form-control" @change="upload">
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import growl from "growl-alert"
    import axios from "axios"

    export default {
        name: 'input-file',
        props: {
            title: '',
            imageName: 'default',
            imageLocale: ''
        },
        data () {
            return {
                file: '',
                pictureUrl: '/images/default.jpg'
            }
        },
        methods: {
            upload () {
                let storageRef = firebase.storage().ref()
                let file = document.getElementById('input').files[0]
                let extension = '.'+file['type'].split('/')[1]
                let uploadTask = storageRef.child(this.imagelocale + this.imageName+extension).put(file)
                uploadTask.on('state_changed', snapshot => {
                    growl.success('Upload em andamento: '+snapshot['totalBytes']+'b')
                }, error => {
                    growl.error('ocorreu um erro ao upload')
                }, () => {
                    this.pictureUrl = uploadTask.snapshot.downloadURL
                    this.$store.dispatch('setFileUrl', this.pictureUrl)
                     growl.success('upload concluido')
                })
            },
            clear () {
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
