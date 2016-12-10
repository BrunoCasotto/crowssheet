<template lang="jade">
    .teal.lighten-3(v-if="$breadcrumb.length")
        .nav-wrapper
            .col.s12
                a.breadcrumb(
                    v-for="(index, route) in $breadcrumb"
                    v-link="{path: route.handler.path, activeClass: 'active'}"
                ) {{ route.handler.breadcrumb }}
</template>

<script>
    export default {
        name: 'Breadcrumb'
    }
</script>

<style lang="sass" scoped>
    .col.s12 {
        padding: 0 1rem;
        height: 50px;
    }

    .breadcrumb {
        line-height: 50px;
    }
</style>
