<template lang="html">
    <div class="header grey lighten-1 ">
        <a href="/" class="title">Crows sheet</a>
    </div>
</template>

<script>
import Menu from '_common/components/Menu.vue'
import Logo from "_common/components/Logo.vue"

    export default {
        name: 'Header',
        components: {
            Menu,
            Logo
        }
    }
</script>

<style lang="sass" scoped>
    @import "~_config/_vars.scss";

    .header {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;

        a {
            text-decoration: none;
            color: black;
        }

        .title {
            z-index: 3;
            font-size: 6rem;
            font-family: 'Dancing Script', cursive;

            @media screen and(max-width: $screen-md) {
                font-size: 4rem;
            }

            @media screen and(max-width: $screen-sm) {
                margin: 30px;
             font-size: 2.5rem;
            }
        }
    }
</style>
