<template lang="jade">
    .modal-content
        .row
            .col.s12
                h5 Project
                .row
                    .input-field
                        input.validate(
                            id="name"
                            type="text"
                            v-model="form.name"
                            v-bind:class="{ 'invalid': errors.name }"
                        )
                        label(
                            for="name"
                            v-bind:data-error="errors.name"
                        ) Project Name
    .modal-footer
        button.btn.waves-effect.waves-light(
            @click="save()"
        ) Save
</template>

<script>
    import growl from 'growl-alert'
    import project from './../../services/firebase/projects'

    export default {
        name: 'ProjectForm',
        data: function () {
            return { 
                form: {
                    name: ''
                },
                errors: {
                    name: null
                }
            }
        },
        events: {
            'modal-closing-project-form': function () {
                this.clear()
            }
        },
        methods: {
            save () {
                project.push(this.form).then(response => {
                    this.$dispatch('modal-hide', 'project-form')
                    this.clear()
                    growl('success', 'Project Saved!')
                })
                .catch( err => {
                    this.errors = err.errors
                })
            },
            clear () {
                this.form.name = ''
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>
