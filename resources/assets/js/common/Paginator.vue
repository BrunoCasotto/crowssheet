<template lang="jade">
    ul.pagination
        li(
            v-bind:class="{'disabled': current === 1}"
            @click="prev()"
        )
            a
                i.material-icons chevron_left

        li(
            v-for="n in pages"
            v-bind:class="{
                'active': current === (n + 1),
                'waves-effect': current !== (n + 1)
            }"
        )
            a(
                @click="changePage(n + 1)"
            ) {{ n + 1 }}
        li(
            v-bind:class="{'disabled': current === pages}"
            @click="next()"
        )
            a
                i.material-icons chevron_right
</template>

<script>
    export default {
        name: 'Paginator',
        data: function () {
           return {
               pages: 0,
               currentPage: 1
           }
        },
        props: {
            data: {
                type: Object,
                require: true
            },
            limit: {
                type: Number,
                default: 15
            }
        },
        computed: {
            pages: function () {
                return this.pages = Math.round(
                    Object.keys(this.data).length / this.limit
                )
            },
            filtered: function () {
                //(1 - 1) * 15 = 0 || (2 - 1) * 15 = 15
                let start = (this.current - 1) * this.limit

                return this.data
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>
