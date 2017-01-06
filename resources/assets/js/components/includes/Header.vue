<template lang="html">
    <div class="header grey lighten-1 ">
        <a href="/" class="title">Igreja Adventista da Promessa</a>
    </div>
</template>

<script>
import Menu from '_common/components/Menu.vue'
import Logo from "_app/common/components/Logo.vue"

    export default {
        name: 'Header',
        components: {
            Menu,
            Logo
        }
    }
</script>

<style lang="sass" scoped>
    @import "~_app/variables.scss";

    .header {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;

        a {
            text-decoration: none;
            color: $color-grey-blue-light;
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
