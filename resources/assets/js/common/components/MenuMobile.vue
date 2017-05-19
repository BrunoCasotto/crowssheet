<template>
<div>
    <div @click="toggle()" class="menu-mobile">
        <i class="fa fa-bars" aria-hidden="true"></i>
    </div>
    <div @click="toggle()" v-if="menuActive" class="overlay"></div>
</div>
</template>

<script>
    export default {
        methods: {
            toggle() {
                this.$store.dispatch('toggleMenuMobile')
            }
        },
        computed: {
            menuActive: function() {
                return this.$store.state.MenuMobile.state
            }
        }
    }
</script>

<style lang="sass" scoped>
@import "~_config/_vars.scss";
	.menu-mobile {
        position: fixed;
        right: 15px;
        top: 65px;
        background-color: $orange-base;
        color: white;
        font-weight: bold;
        height: 50px;
        width: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        transition: .5s all ease;
        z-index: 10;
        @media screen and(min-width: $screen-sm) {
            display: none;
        }
        
        i {
            font-size: 20px;
            line-height: 50px;
            text-align: center;
        }
    }
     .overlay {
        opacity: 0.7;
        top: 0;
        left: 0;
        height: 100%;
        position: fixed;
        width: 100%;
        z-index: 9;
        background: white;
        transition: .5s all ease;
    }
</style>
