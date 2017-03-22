<template>
<div>
    <div @click="toggle()" class="account" :class="{'account--active' : active }">
        <span class="account__name">{{ active? session.displayName : initials}}</span>
		<div class="account__items">
            <div @click="goTo('profile')" class="item">
                <a class="fa fa-user">Meu Perfil</a>
            </div>
            <div @click="goTo('security')" class="item">
                <a class="fa fa-lock">Segurança</a>
            </div>
            <div @click="singout" class="item">
                <a class="fa fa-power-off">Sair</a>
            </div>
        </div>
    </div>
    <div @click="toggle()" v-if="active" class="overlay"></div>
</div>
</template>

<script>
	import authService from '_service/auth'
    
    export default {
        data: function() {
            return {
                active: false,
                initials: ''
            }
        },
        mounted() {
            this.getInitialName()
        },
        methods: {
            getInitialName() {
                var words = this.session.displayName.split(' ')
                if(words.length > 1)
                    this.initials = words[0][0] + words[1][0]
                else
                    this.initials = words[0][0]
            },
            toggle() {
                this.active = !this.active
            },
            singout() {
				this.$store.dispatch('toggleLoader', true)
				authService
				.singout()
				.then(response => {
					this.$store.dispatch('toggleLoader', false)
					if(response.status) {
						window.location.assign('/')
					}
				})
				.catch(error => {
					this.$store.dispatch('toggleLoader', false)
				})
			},
            goTo(location) {
                if(location == 'profile')
                    window.location.href = '/account/profile'

                if(location == 'security')
                    window.location.href = '/account/security'
            }
        },
        computed: {
            session: function () {
                return this.$store.state.Session
            }
        }
    }
</script>

<style lang="sass" scoped>
@import "~_config/_vars.scss";
	.account {
        position: fixed;
        right: 15px;
        top: 10px;
        background-color: $purple-base;
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

        &--active {
            height: 200px;
            width: 300px;
            border-radius: 8px;
        }

        .account__name {
            font-size: 16px;
        }

        .account__items {
            width: 100%;
            height: 100%;
            .item {
                width: 100%;
                height: 30px;
                line-height: 30px;
                background-color: lighten($purple-base ,15);

                &:hover {
                    background-color: lighten($purple-base ,18);
                }

                a {
                    line-height: 30px;
                    transition: .5s all ease;
                    color: white;
                    font-weight: bold;

                    &:before {
                        margin-right: 5px;
                        font-size: 1.3rem;
                    }
                }
            }
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
