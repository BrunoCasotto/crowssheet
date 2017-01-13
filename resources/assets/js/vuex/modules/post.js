import {
    UPDATE_POSTS
} from '../mutation-types'

export default function() {
    const state = {
        posts: 'roso'
    };

    const mutations = {
        [UPDATE_POSTS] (state, posts) {
            state.posts = posts
        }
    }
}
    export default {
        state,
        mutations
    }
