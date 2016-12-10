<template lang="jade">
    .modal(v-el:modal)
        template(v-if="form")
            slot(name="content")
        template(v-else)
            .modal-content
                slot(name="header")
                slot(name="body")
            .modal-footer
                slot(name="footer")
</template>

<script>
    export default {
        name: 'Modal',
        props: {
            name: {
                type: String,
                required: true
            },
            form: {
                type: Boolean,
                default: false
            }
        },
        events: {
            'modal-show': function (name) {
                if (this.name === name) {
                    this.show()
                }
            },
            'modal-hide': function (name) {
                if (this.name === name) {
                    this.hide()
                }
            }
        },
        methods: {
            show: function () {
                $(this.$els.modal).openModal({
                    complete: this.closing
                })
            },
            hide: function () {
                $(this.$els.modal).closeModal()
            },
            closing: function () {
                this.$broadcast(`modal-closing-${this.name}`)
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>
