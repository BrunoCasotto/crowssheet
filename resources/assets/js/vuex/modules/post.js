import {
    UPDATE_POSTS
} from '../mutation-types'

export default {
    state: {
        posts: false
    },
    mutations: {
        [UPDATE_POSTS] (state, posts) {
            state.posts = posts
        }
    },
    actions: {
        updatePost ({commit}, posts) {
            commit(UPDATE_POSTS, posts)
        }
    }
}