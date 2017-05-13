<template>
    <div v-if="active" class="loader-overlay">
        <div class="loader">Carregando...</div>
    </div>
</template>

<script>
    export default {
    computed: {
        active: function () {
            return this.$store.state.Loader.active
        }
    }
    }
</script>

<style lang="sass" scoped>
@import "~_config/_vars.scss";
@import "~_config/_commons.scss";

$color-background: #eaecfa;

.loader {
    width: 250px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-family: helvetica, arial, sans-serif;
    text-transform: uppercase;
    font-weight: 900;
    color: black;
    letter-spacing: 0.2em;
    
    &::before, &::after {
        content: "";
        display: block;
        width: 15px;
        height: 15px;
        background: black;
        position: absolute;
        animation: load .7s infinite alternate ease-in-out;
    }
    
    &::before {
        top: 0;
    }
    
    &::after {
        bottom: 0;
    }
}


</style>
