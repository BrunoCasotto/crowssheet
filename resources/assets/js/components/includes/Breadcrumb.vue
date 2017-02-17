<template lang="jade">
    .teal.lighten-3(v-if="$breadcrumb.length")
        .nav-wrapper
            .col.s12
                a.breadcrumb(
                    v-for="(route, index) in $breadcrumb"
                    v-link="{path: route.meta.handler.path, activeClass: 'active'}"
                ) {{ route.meta.handler.breadcrumb }}
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
