import {
    UPDATE_POSTS
} from '../mutation-types'

export default function() {
    const state = {
        posts: false
    }

    const mutations = {
        [UPDATE_POSTS] (state) {
            state.posts = state
        }
    }

    return {
        state,
        mutations
    }
}