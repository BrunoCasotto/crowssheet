<template lang="html">
	<div class="featured-category " v-cloak>
		<div class="featured-category__content">
				<div class="featured-category__block">
						<a class="featured-category__image" href="/category" style="background-image: url('/images/wall2.png');">
							<h3 class="image__title">Avivamento</h3>
							<button class="image__button image__button--up">Conheça</button>
						</a>
				</div>
				<div class="featured-category__block">
					<a class="featured-category__image" href="/boletim" style="background-image: url('/images/wall1.jpeg');">
						<h3 class="image__title image__title--md">Boletim</h3>
						<p class="image__text">Escala e programação da IAP Amparo</p>
						<button class="image__button">Abrir</button>
					</a>
					<div class="block__row">
						<a class="featured-category__image featured-category__image--md" href="/category" style="background-image: url('/images/wall3.jpg');">
							<h3 class="image__title image__title--sm">Café com Bíblia</h3>
							<p class="image__text">Deus quer falar com você.</p>
							<button class="image__button">Escutar</button>
						</a>
						<a class="featured-category__image featured-category__image--md" href="/category" style="background-image: url('/images/wall6.png');">
							<h3 class="image__title image__title--sm">Escola Biblica</h3>
							<p class="image__text">Quem ama quer aprender.</p>
							<button class="image__button">Ir para estudo</button>
						</a>
					</div>
				</div>
		</div>
	</div>
</template>
<script>

export default {
  data () {
    return {
		items: [
			{ 
				src: '/images/wall2.png',
				alt: '/images/wall2.png'
			},
			{
				src: '/images/wall1.jpeg',
				alt: '/images/wall1.jpeg'
			},
			{
				src: '/images/wall3.png',
				alt: '/images/wall3.png'
			},
			{
				src: '/images/wall4.jpeg',
				alt: '/images/wall4.jpeg'
			},
			{
				src: '/images/wall5.png',
				alt: '/images/wall5.png'
			},
			{
				src: '/images/wall6.png',
				alt: '/images/wall6.png'
			}
		]
	}
},
components: {
	
},
props: {
	content: []
}
}
</script>

<style lang="sass">
@import "~_config/_vars.scss";

.featured-category {
    width: 100%;

    &__content {
        flex:1;
        display:flex;
        height: 100%;

        @media screen and(max-width: $screen-md) {
            flex-direction: column;
        }
    }

    &__block {
        display: flex;
        flex-direction: column;
        flex:1;

        @media screen and(min-width: $screen-md) {
            height: 500px;
        }

        .block__row {
            display: flex;
            flex-wrap: wrap;
            flex:1;

            @media screen and(min-width: $screen-md) {
                height: 250px;
            }

        }
    }

    &__image {
        flex:1;
        position:relative;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        animation: grown .5s cubic-bezier(0,-0.48, 0.79, 1.08);

        &:before {
            content: '';
            display:block;
            width: 100%;
            height: 100%;
            background-color: $color-black--base;
            transition: opacity 1s cubic-bezier(0,-0.48, 0.79, 1.08);
            opacity: 0.4;
        }

        .image__title {
            position: absolute;
            left: 50%;
            top: 55%;
            transform: translate(-50%, -50%);
            color: $color-white--base;
            font-size: 4rem;
            font-family: Palatino Linotype Bold ;
            text-transform: uppercase;
            text-align: center;
            transition: transform .3s cubic-bezier(0,-0.48, 0.79, 1.08);

            @media screen and(max-width: $screen-xg) {
                font-size: 3.5rem;
            }

            @media screen and(max-width: $screen-lg) {
                font-size: 2.9rem;
            }

            @media screen and(max-width: $screen-md) {
                font-size: 2rem;
                top:50%;
            }

            &--md {
                top: 50%;
                font-size: 2.5rem;
                @media screen and(max-width: $screen-md) {
                    font-size: 2rem;
                }
            }

            &--sm {
                top: 50%;
                font-size: 2rem;

                @media screen and(max-width: $screen-md) {
                    font-size: 2rem;
                }
                
                @media screen and(max-width: $screen-sm) {
                    font-size: 1.4rem;
                    max-width: 100%;
                }
            }
        }

        .image__text {
            position: absolute;
            left: 50%;
            top: 55%;
            transform: translate(-50%, -50%);
            color: $color-white--base;
            font-size: 1rem;
            transition: opacity .3s .2s cubic-bezier(0,-0.48, 0.79, 1.08);
            opacity: 0;
            width: 100%;
            text-align: center;

            @media screen and(max-width: $screen-md) {
                top: 55%;
            }
        }

        .image__button {
            position: absolute;
            left: 50%;
            top: 70%;
            transform: translate(-50%, -50%);
            background-color: transparent;
            border: solid 3px $color-white--base;;
            height: 40px;
            width: 145px;
            color:$color-white--base;
            font-size: 1rem;
            text-transform: uppercase;
            transition: opacity .3s .2s cubic-bezier(0,-0.48, 0.79, 1.08);
            opacity: 0;

            &--up {
                top: 60%;
            }
        }

        @media screen and(min-width: $screen-md) {
            &:hover {

                .image__title {
                    transform: translate(-50%, -100%);
                    opacity: 0.3;
                }

                .image__button {
                    opacity: 1;
                }

                .image__text {
                    opacity: 1;
                }

                &:before {
                    opacity: 0.1;
                }
            }
        }

        @media screen and(max-width: $screen-md) {
            height: 300px;

            .image__title {
                transform: translate(-50%, -100%);
            }

            .image__button {
                opacity: 1;
            }

            .image__text {
                opacity: 1;
            }

            &:before {
                opacity: 0.1;
            }
        }
    }
}

@keyframes grown {
  0% {
      transform: scale(0);
  }
    100% {
      transform: scale(1);
      opacity: 1;
    }
}
</style>
